import React, { useState, useRef, useEffect } from "react";
import { Elements } from "../Assets/Data";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import Loader from "react-loaders"; 
import "loaders.css/loaders.css";   

// Icons
import rasmlink from "../img/img_Icon/link.png";
import rasmview from "../img/img_Icon/view.png";
import rasmgithub from "../img/img_Icon/github.png";
import notsearch from "../img/img_Icon/notsearch.png";
// Project name img
import rasmMyteam from "../img/img_nima/Myteam.png";
import useTitle from "../Components/useTitle";

const Projects = () => {
  useTitle("Projects")
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState("");

  const searchRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);       
  const [searchLoading, setSearchLoading] = useState(false); 

  const projects = [
    { name: "Myteam", img: rasmMyteam, level: "easy", color: "bg-green-500", shadow: "shadow-green-500", link: "/1" },
    { name: "Project 2", img: rasmMyteam, level: "medium", color: "bg-yellow-500", shadow: "shadow-yellow-500", link: "/2" },
    { name: "Project 3", img: rasmMyteam, level: "hard", color: "bg-red-500", shadow: "shadow-red-500", link: "/3" },
    { name: "Project 4", img: rasmMyteam, level: "easy", color: "bg-green-400", shadow: "shadow-green-400", link: "/4" },
    { name: "Project 5", img: rasmMyteam, level: "medium", color: "bg-yellow-400", shadow: "shadow-yellow-400", link: "/5" },
  ];

  const openModal = (img) => {
    setModalImg(img);
    setModalOpen(true);
  };

  // Ctrl + / input focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Page loader
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Search filter
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProjects(projects);
      return;
    }

    setSearchLoading(true);
    const timer = setTimeout(() => {
      const results = projects.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(results);
      setSearchLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <section className={`${Elements.Container} py-3`}>
      <ul className="flex flex-col md:flex-row items-center justify-between gap-3">
        <li>
          <h2 className="text-lg sm:text-xl md:text-2xl border-b border-l rounded-b-lg rounded-lg w-full md:w-60 max-sm:w-96 text-center shadow-inner shadow-cyan-500 py-1">
            {t("myProjects")}
          </h2>
        </li>
        <li className="w-full md:w-auto">
          <input
            ref={searchRef}
            type="search"
            placeholder={t("searchs")}
            autoComplete="off"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              w-full md:w-64
              bg-black 
              border border-cyan-500 
              placeholder:text-cyan-400 
              rounded-md 
              px-3 py-2 
              text-white text-sm md:text-base
              focus:outline-none 
              focus:ring-1 focus:ring-cyan-500 
              hover:border-cyan-400 hover:bg-white/10
              transition duration-300 ease-in-out
            "
          />
        </li>
      </ul>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[90vh]">
          <Loader type="ball-clip-rotate-multiple" active />
        </div>
      ) : searchLoading ? (
        <div className="flex justify-center items-center min-h-[90vh]">
          <Loader type="ball-clip-rotate-multiple" active />
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5 max-md:mb-32 sm:mb-32">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <li key={index} className="flex flex-col items-center">
                <div className="flex justify-between items-center border my-3 w-full rounded-lg px-2 md:px-3 shadow-inner shadow-white">
                  <button className="py-2" onClick={() => openModal(project.img)}>
                    <img
                      width={28}
                      height={28}
                      className="border rounded-full p-1 hover:bg-white/20"
                      src={rasmview}
                      alt="View"
                    />
                  </button>
                  <div className="flex items-center gap-x-2">
                    <Link to={project.link}>
                      <img
                        width={28}
                        height={28}
                        className="border rounded-full p-1 hover:bg-white/20"
                        src={rasmlink}
                        alt="Link"
                      />
                    </Link>
                    <Link to="https://github.com/">
                      <img
                        width={28}
                        height={28}
                        className="border rounded-full p-1 hover:bg-white/20"
                        src={rasmgithub}
                        alt="Github"
                      />
                    </Link>
                  </div>
                </div>

                <div className="w-full">
                  <img className="border rounded-sm w-full h-auto object-cover" src={project.img} alt="" />
                </div>

                <div
                  className={`w-full flex justify-between items-center px-2 py-2 mt-3 border-b rounded-md shadow-inner ${project.shadow}`}
                >
                  <p className="text-sm sm:text-base">{project.name}</p>
                  <ul className="flex items-center gap-x-2">
                    <li className="text-sm sm:text-base">{t(project.level)}</li>
                    <li>
                      <span className={`inline-block w-3 h-3 sm:w-4 sm:h-4 border rounded-full ${project.color}`}></span>
                    </li>
                  </ul>
                </div>
              </li>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center min-h-[50vh] max-h-[100vh]">
              <img className="w-40 sm:w-48 opacity-80" src={notsearch} alt="Not Found" />
            </div>
          )}
        </ul>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-3">
          <div className="bg-white p-3 sm:p-5 rounded-lg relative max-w-lg w-full">
            <button
              className="absolute top-2 right-2 text-black text-2xl font-bold"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </button>
            <img src={modalImg} alt="Project" className="max-w-full max-h-[70vh] object-contain" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
