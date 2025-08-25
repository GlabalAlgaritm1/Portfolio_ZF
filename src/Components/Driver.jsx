import React, { useState } from 'react';
// icons 
import Telegram from '../img/img_Icon/telegram.png';
import Profil from '../img/img_Icon/Profil.png';
import Left from '../img/img_Icon/Left.png';
import Warning from '../img/img_Icon/Warning.png';
import insta from '../img/img_Icon/instagram.png'
import youtube from '../img/img_Icon/youtube.png'
import gmail from '../img/img_Icon/gmail.png'
// Logo 
import Logo from '../img/img_Logo/Logo.jpg';
import { Link } from 'react-router';

const Driver = () => {
    const [isOpen, setIsOpen] = useState(false); // Asosiy toggle
    const [activeDriver, setActiveDriver] = useState(null); // null, 'driver1', 'driver3'

    const handleClick = () => setIsOpen(!isOpen);

    const closeAllDrivers = () => {
        setIsOpen(false);
        setActiveDriver(null);
    };

    const isOverlayVisible = isOpen || activeDriver;

    // Tug'ilgan kun va yoshni hisoblash funksiyasi
    const getBirthInfo = (birthDateStr) => {
        const birthDate = new Date(birthDateStr);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = birthDate.toLocaleDateString('en-US', options);
        return `${formattedDate} (${age} yosh)`;
    };

    return (
        <section>
            {/* Asosiy toggle tugma */}
            <button
                className="bg-cyan-600 p-3 rounded-full fixed bottom-9 right-12
          transition-transform duration-300 ease-in-out z-50"
                onClick={handleClick}
            >
                {/* Pulse animatsiyasi */}
                <span className="absolute -inset-2 rounded-full bg-cyan-400 opacity-40 animate-pulse"></span>
                <span className="absolute -inset-1.5 rounded-full border border-cyan-400 opacity-50 animate-ping"></span>
                <span className="absolute -inset-0.5 rounded-full border border-cyan-400 opacity-40 animate-ping"></span>

                {/* SVGlar */}
                <div className="w-7 h-7 relative rounded-full flex items-center justify-center">
                    {/* X SVG */}
                    <svg
                        className={`absolute top-0 left-0 w-7 h-7 text-white transition-all duration-500 ease-in-out
            ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-45'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="29"
                        height="29"
                        viewBox="0 0 29 29"
                    >
                        <path
                            fill="#FFF"
                            fillRule="evenodd"
                            d="M18.866 14.45l9.58-9.582L24.03.448l-9.587 9.58L4.873.447.455 4.866l9.575 9.587-9.583 9.57 4.418 4.42 9.58-9.577 9.58 9.58 4.42-4.42"
                        />
                    </svg>

                    {/* Default SVG */}
                    <svg
                        className={`b24-crm-button-icon absolute top-0 left-0 w-7 h-7 text-white transition-all duration-500 ease-in-out
            ${isOpen ? 'opacity-0 rotate-0' : 'opacity-100'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 28"
                    >
                        <path
                            className="b24-crm-button-webform-icon"
                            fill="#FFFFFF"
                            fillRule="evenodd"
                            d="M815.406703,961 L794.305503,961 C793.586144,961 793,961.586144 793,962.305503 L793,983.406703 C793,984.126062 793.586144,984.712206 794.305503,984.712206 L815.406703,984.712206 C816.126062,984.712206 816.712206,984.126062 816.712206,983.406703 L816.712206,962.296623 C816.703325,961.586144 816.117181,961 815.406703,961 L815.406703,961 Z M806.312583,979.046143 C806.312583,979.454668 805.975106,979.783264 805.575462,979.783264 L796.898748,979.783264 C796.490224,979.783264 796.161627,979.445787 796.161627,979.046143 L796.161627,977.412044 C796.161627,977.003519 796.499105,976.674923 796.898748,976.674923 L805.575462,976.674923 C805.983987,976.674923 806.312583,977.0124 806.312583,977.412044 L806.312583,979.046143 L806.312583,979.046143 Z M813.55946,973.255747 C813.55946,973.664272 813.221982,973.992868 812.822339,973.992868 L796.889868,973.992868 C796.481343,973.992868 796.152746,973.655391 796.152746,973.255747 L796.152746,971.621647 C796.152746,971.213122 796.490224,970.884526 796.889868,970.884526 L812.813458,970.884526 C813.221982,970.884526 813.550579,971.222003 813.550579,971.621647 L813.550579,973.255747 L813.55946,973.255747 Z M813.55946,967.45647 C813.55946,967.864994 813.221982,968.193591 812.822339,968.193591 L796.889868,968.193591 C796.481343,968.193591 796.152746,967.856114 796.152746,967.45647 L796.152746,965.82237 C796.152746,965.413845 796.490224,965.085249 796.889868,965.085249 L812.813458,965.085249 C813.221982,965.085249 813.550579,965.422726 813.550579,965.82237 L813.550579,967.45647 L813.55946,967.45647 Z"
                            transform="translate(-793 -961)"
                        ></path>
                    </svg>
                </div>
            </button>

            {/* Dumaloq buttonlar */}
            {isOpen && (
                <div className="fixed bottom-28 right-[50px] flex flex-col items-center space-y-3 z-50">
                    <button
                        className="bg-[#00AEEF] w-12 h-12 rounded-full shadow-md flex items-center justify-center transition z-50"
                        onClick={() =>
                            setActiveDriver(activeDriver === 'driver3' ? null : 'driver3')
                        }
                    >
                        <svg
                            className="b24-crm-button-icon p-[2px]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 24 28"
                        >
                            <path
                                className="b24-crm-button-webform-icon"
                                fill="#FFFFFF"
                                fillRule="evenodd"
                                d="M815.406703,961 L794.305503,961 C793.586144,961 793,961.586144 793,962.305503 L793,983.406703 C793,984.126062 793.586144,984.712206 794.305503,984.712206 L815.406703,984.712206 C816.126062,984.712206 816.712206,984.126062 816.712206,983.406703 L816.712206,962.296623 C816.703325,961.586144 816.117181,961 815.406703,961 L815.406703,961 Z M806.312583,979.046143 C806.312583,979.454668 805.975106,979.783264 805.575462,979.783264 L796.898748,979.783264 C796.490224,979.783264 796.161627,979.445787 796.161627,979.046143 L796.161627,977.412044 C796.161627,977.003519 796.499105,976.674923 796.898748,976.674923 L805.575462,976.674923 C805.983987,976.674923 806.312583,977.0124 806.312583,977.412044 L806.312583,979.046143 L806.312583,979.046143 Z M813.55946,973.255747 C813.55946,973.664272 813.221982,973.992868 812.822339,973.992868 L796.889868,973.992868 C796.481343,973.992868 796.152746,973.655391 796.152746,973.255747 L796.152746,971.621647 C796.152746,971.213122 796.490224,970.884526 796.889868,970.884526 L812.813458,970.884526 C813.221982,970.884526 813.550579,971.222003 813.550579,971.621647 L813.550579,973.255747 L813.55946,973.255747 Z M813.55946,967.45647 C813.55946,967.864994 813.221982,968.193591 812.822339,968.193591 L796.889868,968.193591 C796.481343,968.193591 796.152746,967.856114 796.152746,967.45647 L796.152746,965.82237 C796.152746,965.413845 796.490224,965.085249 796.889868,965.085249 L812.813458,965.085249 C813.221982,965.085249 813.550579,965.422726 813.550579,965.82237 L813.550579,967.45647 L813.55946,967.45647 Z"
                                transform="translate(-793 -961)"
                            ></path>
                        </svg>
                    </button>

                    {/* Profil button */}
                    <button
                        className="bg-[#00AEEF] text-white w-12 h-12 rounded-full shadow-md flex items-center justify-center transition z-50"
                        onClick={() =>
                            setActiveDriver(activeDriver === 'driver1' ? null : 'driver1')
                        }
                    >
                        <img width={32} height={32} src={Profil} alt="" />
                    </button>

                    {/* Telegram button */}
                    <a
                        href="https://t.me/username"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white w-12 h-12 rounded-full shadow-md flex items-center justify-center transition z-50"
                    >
                        <img src={Telegram} alt="Telegram" />
                    </a>
                </div>
            )}

            {/* Umumiy Overlay */}
            {isOverlayVisible && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={closeAllDrivers}
                ></div>
            )}

            {/* Driver 1 panel */}
            {activeDriver === 'driver1' && (
                <div className="fixed top-0 left-0 w-[335px] h-full bg-black border-r rounded-r-lg shadow-lg z-50 flex flex-col p-4 text-white">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-semibold">My Profil</h2>
                        <button onClick={closeAllDrivers}>
                            <img src={Left} alt="" />
                        </button>
                    </div>
                    {/* Scrollable content wrapper */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <img className="rounded-lg shadow-inner shadow-white p-1" src={Logo} alt="" />
                        <div className="flex items-center gap-x-16 my-2 mx-auto">
                            <img src={Warning} alt="Nomer" />
                            <div>
                                <Link className="font-mono">+998 94 040 18 01</Link>
                                <p className="text-white/45 mr-16">Mobile</p>
                            </div>
                        </div>
                        <div>
                            <p>Endure the pain of life and victory will be yours.</p>
                            <span className="text-white/45">Bio</span>
                        </div>
                        <div className="mt-2">
                            <p>{getBirthInfo("Aug 1, 2008")}</p>
                            <span className='text-white/45'>Tug'ilgan kunim</span>
                        </div>
                        <p className='font-bold text-lg my-5'>My social media accounts:</p>
                        <ul className='grid grid-cols-4 gap-5'>
                            <li>
                                <Link>
                                    <img className='border rounded-full bg-white' src={Telegram} alt="" />
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <img className='border rounded-full bg-white' src={insta} alt="" />

                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <img className='border rounded-full bg-white p-1' width={46} height={46} src={youtube} alt="" />
                                </Link>

                            </li>
                            <li>
                                <Link>
                                    <img className='border rounded-full bg-white p-1' width={46} height={46} src={gmail} alt="" />

                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            {/* Driver 3 panel */}
            {activeDriver === 'driver3' && (
                <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col p-4">
                    <div className="flex flex-col flex-1 overflow-y-auto">
                        <button className="self-end text-xl font-bold mb-4" onClick={() => setActiveDriver(null)}>
                            Chiqish
                        </button>
                        <h2 className="text-xl font-semibold mb-3">Driver 3 Panel</h2>
                        <p className="text-gray-600">
                            Bu yerga SVG button funksiyalari joylashadi. Shu yerga ko'proq content qo‘ysangiz, scroll paydo bo‘ladi.
                        </p>
                        {/* Qo‘shimcha content scroll uchun */}
                        <div className="h-96"></div>
                    </div>
                </div>
            )}

        </section>
    );
};

export default Driver;
