import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Elements } from "../Assets/Data";
import { useTranslation } from "react-i18next";

// Icons
import Microfon from "../img/img_Icon/Microfon.png";
import HomeIcon from "../img/img_Icon/home.svg";
import AboutIcon from "../img/img_Icon/about.svg";
import ProjectIcon from "../img/img_Icon/lala.svg";
import ContactIcon from "../img/img_Icon/contact.svg";

const Xeader = () => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // ✅ Saqlangan tilni olish
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  // 🎤 SpeechRecognition init
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("❌ SpeechRecognition API mavjud emas!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = i18n.language === "en" ? "en-US" : "uz-UZ";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.toLowerCase();
      console.log("🎤 Siz aytdingiz:", transcript);

      // 🔹 Navigatsiya (ko‘proq sinonimlar bilan)
      if (
        transcript.includes("home") ||
        transcript.includes("main") ||
        transcript.includes("start") ||
        transcript.includes("asosiy") ||
        transcript.includes("bosh sahifa")
      ) {
        navigate("/");
      } else if (
        transcript.includes("about") ||
        transcript.includes("haqimda") ||
        transcript.includes("men haqimda") ||
        transcript.includes("biz haqimizda") ||
        transcript.includes("ma'lumot") ||
        transcript.includes("haqida")
      ) {
        navigate("/About");
      } else if (
        transcript.includes("projects") ||
        transcript.includes("project") ||
        transcript.includes("portfolio") ||
        transcript.includes("loyihalar") ||
        transcript.includes("proyektlar") ||
        transcript.includes("ishlarim")
      ) {
        navigate("/Projects");
      } else if (
        transcript.includes("contact") ||
        transcript.includes("aloqa") ||
        transcript.includes("bog'lanish") ||
        transcript.includes("xabar") ||
        transcript.includes("telefon")
      ) {
        navigate("/Contact");
      }

      // 🔹 Til almashtirish (ovoz orqali)
      if (
        transcript.includes("english") ||
        transcript.includes("ingliz") ||
        transcript.includes("en")
      ) {
        i18n.changeLanguage("en");
        localStorage.setItem("lang", "en");
        if (recognitionRef.current) recognitionRef.current.lang = "en-US";
      } else if (
        transcript.includes("uzbek") ||
        transcript.includes("o'zbek") ||
        transcript.includes("uz")
      ) {
        i18n.changeLanguage("uz");
        localStorage.setItem("lang", "uz");
        if (recognitionRef.current) recognitionRef.current.lang = "uz-UZ";
      }
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [i18n.language, navigate]);

  // 🎤 Mikrofon tugmasi
  const handleMicClick = () => {
    if (!recognitionRef.current) {
      alert("❌ Sizning brauzeringiz ovoz bilan boshqarishni qo‘llab-quvvatlamaydi!");
      return;
    }

    if (!isListening) {
      recognitionRef.current.lang = i18n.language === "en" ? "en-US" : "uz-UZ";
      recognitionRef.current.start();
      setIsListening(true);
      console.log("🎤 Mikrofon ishga tushdi...");
    } else {
      recognitionRef.current.stop();
      setIsListening(false);
      console.log("⏹ Mikrofon o‘chirildi.");
    }
  };

  // 🌐 Tilni almashtirish tugmasi
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "uz" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);

    if (recognitionRef.current) {
      recognitionRef.current.lang = newLang === "en" ? "en-US" : "uz-UZ";
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className={`${Elements.Container} border-b py-3 rounded-b-xl`}>
        <section className="flex items-center justify-between">
          <Link className="font-semibold text-2xl" to="/">
            Zafarbek<span className="text-cyan-500">.</span>uz
          </Link>

          {/* 🔹 NAV */}
          <nav className="flex items-center gap-x-3">
            <NavLink to="/" className="hidden md:inline">
              <span className="border px-3 py-2 rounded-xl">{t("home")}</span>
            </NavLink>
            <NavLink to="/About" className="hidden md:inline">
              <span className="border px-3 py-2 rounded-xl">{t("abouta")}</span>
            </NavLink>
            <NavLink to="/Projects" className="hidden md:inline">
              <span className="border px-3 py-2 rounded-xl">{t("projects")}</span>
            </NavLink>
            <NavLink to="/Contact" className="hidden md:inline">
              <span className="border px-3 py-2 rounded-xl">{t("contacta")}</span>
            </NavLink>

            {/* 🎤 Mikrofon tugmasi */}
            <button
              onClick={handleMicClick}
              className={`border rounded-full p-2 transition ${
                isListening
                  ? "bg-red-500 border-red-700"
                  : "bg-white border-cyan-700"
              }`}
            >
              <img width={24} height={24} src={Microfon} alt="microphone" />
            </button>

            {/* 🌐 Translate tugmasi */}
            <button
              onClick={toggleLanguage}
              className="border rounded-lg px-3 py-1 bg-cyan-500 text-white"
            >
              {i18n.language.toUpperCase()}
            </button>
          </nav>
        </section>
      </header>

      {/* FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black border-t py-2 md:hidden z-50">
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
