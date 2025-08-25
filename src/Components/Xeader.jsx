import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Elements } from "../Assets/Data";
import Loader from "react-loaders";
import "loaders.css/loaders.css";
import { useTranslation } from "react-i18next";

// Icons
import Microfon from "../img/img_Icon/Microfon.png";
import HomeIcon from "../img/img_Icon/home.svg";
import AboutIcon from "../img/img_Icon/about.svg";
import ProjectIcon from "../img/img_Icon/Projects.svg";
import ContactIcon from "../img/img_Icon/contact.svg";

const Xeader = () => {
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(
    localStorage.getItem("micEnabled") === "true"
  );
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // 🎤 SpeechRecognition
  useEffect(() => {
    if (!isListening) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition API is not supported ❌");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = i18n.language === "en" ? "en-US" : "uz-UZ";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.toLowerCase();
      console.log("Siz aytdingiz:", transcript);

      if (transcript.includes(t("home").toLowerCase())) {
        navigate("/");
      } else if (transcript.includes(t("abouta").toLowerCase())) {
        navigate("/About");
      } else if (transcript.includes(t("projects").toLowerCase())) {
        navigate("/Projects");
      } else if (transcript.includes(t("contacta").toLowerCase())) {
        navigate("/Contact");
      }

      if (
        transcript.includes("translate uzbek") ||
        transcript.includes("uzbek")
      ) {
        i18n.changeLanguage("uz");
        localStorage.setItem("lang", "uz");
      } else if (
        transcript.includes("translate english") ||
        transcript.includes("english")
      ) {
        i18n.changeLanguage("en");
        localStorage.setItem("lang", "en");
      }
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
    };

    return () => recognition.stop();
  }, [isListening, navigate, i18n.language, t]);

  const handleMicClick = () => {
    setLoading(true);

    const utterance = new SpeechSynthesisUtterance(t("ready"));
    utterance.lang = i18n.language === "en" ? "en-US" : "uz-UZ";
    window.speechSynthesis.speak(utterance);

    utterance.onend = () => {
      setLoading(false);
      setIsListening(true);
      localStorage.setItem("micEnabled", "true");
    };
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "uz" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <>
      {/* HEADER */}
      <header className={`${Elements.Container} border-b py-3 rounded-b-xl`}>
        <section className="flex items-center justify-between">
          <Link className="font-semibold text-2xl" to="/">
            Zafarbek<span className="text-cyan-500">.</span>uz
          </Link>

          <nav className="hidden md:flex items-center gap-x-5">
            <NavLink to="/">
              <span className="border px-3 py-2 rounded-xl">{t("home")}</span>
            </NavLink>
            <NavLink to="/About">
              <span className="border px-3 py-2 rounded-xl">{t("abouta")}</span>
            </NavLink>
            <NavLink to="/Projects">
              <span className="border px-3 py-2 rounded-xl">{t("projects")}</span>
            </NavLink>
            <NavLink to="/Contact">
              <span className="border px-3 py-2 rounded-xl">{t("contacta")}</span>
            </NavLink>

            {!isListening && (
              <button
                onClick={handleMicClick}
                className="border rounded-full p-2 border-cyan-700"
              >
                <img width={24} height={24} src={Microfon} alt="microphone" />
              </button>
            )}

            <button
              onClick={toggleLanguage}
              className="border rounded-lg px-3 py-1 bg-cyan-500 text-white"
            >
              {i18n.language.toUpperCase()}
            </button>
          </nav>
        </section>

        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <Loader type="ball-clip-rotate-multiple" active />
          </div>
        )}
      </header>

      {/* FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t py-2 md:hidden">
        <div className="flex justify-around">
          <NavLink to="/" className="flex flex-col items-center">
            <img src={HomeIcon} alt="home" className="w-6 h-6" />
            <span className="text-xs">{t("home")}</span>
          </NavLink>
          <NavLink to="/About" className="flex flex-col items-center">
            <img src={AboutIcon} alt="about" className="w-6 h-6" />
            <span className="text-xs">{t("abouta")}</span>
          </NavLink>
          <NavLink to="/Projects" className="flex flex-col items-center">
            <img src={ProjectIcon} alt="projects" className="w-6 h-6" />
            <span className="text-xs">{t("projects")}</span>
          </NavLink>
          <NavLink to="/Contact" className="flex flex-col items-center">
            <img src={ContactIcon} alt="contact" className="w-6 h-6" />
            <span className="text-xs">{t("contacta")}</span>
          </NavLink>
        </div>
      </footer>
    </>
  );
};

export default Xeader;
