import React from 'react'
import { Link } from 'react-router'
import { Elements } from '../Assets/Data'
import { useTranslation } from 'react-i18next'
import Driver from '../Components/Driver'
import useTitle from '../Components/useTitle'

const Home = () => {
  useTitle("Bosh sahifa")
  const { t } = useTranslation()

  return (
    <section className={`${Elements.Container} py-[21px] mt-32 pb-52 text-center px-4 sm:px-6 lg:px-8 max-sm:pb-60 max-sm:mt-32`}>
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-serif font-semibold'>
        Zafarbek Ahmadaliyev
        
        const TELEGRAM_BOT_TOKEN = '8314792220:AAGcxtFBHaXLmd4uaTm5udxhNd-ZANtIGzA'; // xavfsiz joyda saqlang
        const CHAT_ID = '7764198922';
      </h1>

      {/* Matnni tarjima bilan chiqarish */}
      <p
        className='text-base sm:text-lg md:text-xl font-semibold my-4 mx-auto w-full max-w-md md:max-w-xl'
        dangerouslySetInnerHTML={{ __html: t('intro') }}
      />

      <div className='flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-x-5 mb-4'>
        <Link
          to='tel:+998940401801'
          className='border px-4 py-2 rounded-xl shadow-inner shadow-cyan-500 font-semibold w-full sm:w-auto'
        >
          {t('contactd')}
        </Link>
        <Link
          to='/about'
          className='border px-4 py-2 rounded-xl shadow-inner shadow-green-500 font-semibold w-full sm:w-auto'
        >
          {t('aboutb')}
        </Link>
      </div>
      <Driver />
    </section>
  )
}

export default Home
