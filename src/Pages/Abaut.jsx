import React from 'react';
import { Elements } from '../Assets/Data';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
// Title 
import useTitle from '../Components/useTitle';


// icons 
import telegram from '../img/img_Icon/telegram.png';
// skills
import rasmhtml from '../img/img_skills/html.png';
import rasmcss from '../img/img_skills/css.png';
import rasmjs from '../img/img_skills/js.png';
import rasmteilwind from '../img/img_skills/teilwind.png';
import rasmbootstrap from '../img/img_skills/bootstrap.png';
import rasmreact from '../img/img_skills/react.png';
// men nimalar qila olaman image
import SEO from '../img/img_nima/seo.svg';
import olmos from '../img/img_nima/olmos.svg';
import dizayn from '../img/img_nima/dizayn.svg';
import fast from '../img/img_nima/fast.svg';

const About = () => {
  const { t } = useTranslation();
  useTitle("Abaut")
  return (
    <section className={`${Elements.Container} py-3`}>

      <div className="flex flex-col lg:flex-row justify-between gap-6">

        {/* Left Section */}
        <section className="flex-1">
          <h2 className='text-2xl border-b border-l rounded-b-lg rounded-lg w-40 text-center shadow-inner shadow-cyan-500 py-1'>
            {t('abouts.title')}
          </h2>

          <p className='text-xl font-semibold py-2 flex flex-col space-y-3'>
            <span>{t('abouts.intro')}</span>
            <span>{t('abouts.skills')}</span>
            <span>{t('abouts.learning')}</span>

            <span className='flex items-center gap-x-5'>
              {t('abouts.contact')}
              <Link
                to='https://t.me/@GeniusZF'
                target='_blank'
                className='flex items-center gap-x-1 border px-1 rounded-lg bg-white text-black text-lg py-1'
              >
                <img width={28} height={28} src={telegram} alt="Telegram" />
                {t('abouts.telegram')}
              </Link>
            </span>
          </p>
        </section>

        {/* Right Section */}
        <section className="flex-1">
          <h2 className='mb-4 text-2xl border-b border-l rounded-b-lg rounded-lg w-72 text-center mx-auto shadow-inner shadow-cyan-500 py-1'>
            {t('abouts.abilities_title')}
          </h2>
          <ul className='grid grid-cols-1 gap-2'>
            <li className='flex gap-x-2 border p-5 rounded-lg bg-white/10'>
              <img className='bg-[#2B4054] p-2 rounded-lg' src={SEO} alt="SEO" />
              <div className='flex flex-col'>
                <span className='text-lg font-semibold'>{t('abouts.abilities.seo.title')}</span>
                <p className='text-white/35'>{t('abouts.abilities.seo.desc')}</p>
              </div>
            </li>
            <li className='flex gap-x-2 border p-5 rounded-lg bg-white/10'>
              <img className='bg-[#542833] p-2 rounded-lg' src={dizayn} alt="Design" />
              <div className='flex flex-col'>
                <span className='text-lg font-semibold'>{t('abouts.abilities.design.title')}</span>
                <p className='text-white/35'>{t('abouts.abilities.design.desc')}</p>
              </div>
            </li>
            <li className='flex gap-x-2 border p-5 rounded-lg bg-white/10'>
              <img className='bg-[#3D4F4A] p-2 rounded-lg' src={olmos} alt="Quality" />
              <div className='flex flex-col'>
                <span className='text-lg font-semibold'>{t('abouts.abilities.quality.title')}</span>
                <p className='text-white/35'>{t('abouts.abilities.quality.desc')}</p>
              </div>
            </li>
            <li className='flex gap-x-2 border p-5 rounded-lg bg-white/10'>
              <img className='bg-[#145033] p-2 rounded-lg' src={fast} alt="Fast" />
              <div className='flex flex-col'>
                <span className='text-lg font-semibold'>{t('abouts.abilities.fast.title')}</span>
                <p className='text-white/35'>{t('abouts.abilities.fast.desc')}</p>
              </div>
            </li>
          </ul>
        </section>
      </div>

      {/* Skills Section */}
      <section>
        <h2 className='my-8 text-2xl border-b border-l rounded-b-lg rounded-lg w-40 text-center mx-auto shadow-inner shadow-cyan-500 py-1'>
          {t('abouts.skills_title')}
        </h2>
        <ul className='grid grid-cols-6 gap-4 my-2'>
          {[rasmhtml, rasmcss, rasmjs, rasmteilwind, rasmbootstrap, rasmreact].map((img, i) => (
            <li key={i} className='border p-3 rounded-lg shadow-inner shadow-orange-500 mx-auto'>
              <img width={150} height={150} src={img} alt={`skill-${i}`} />
            </li>
          ))}
        </ul>
      </section>

    </section>
  );
};

export default About;
