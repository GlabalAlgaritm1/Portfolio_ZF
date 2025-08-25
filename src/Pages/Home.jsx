import React from 'react'
import { Link } from 'react-router'
import { Elements } from '../Assets/Data'
import { useTranslation } from 'react-i18next'
import Driver from '../Components/Driver'

const Home = () => {
  const { t } = useTranslation()

  return (
    <section className={`${Elements.Container} py-[21px] mt-32 pb-52 text-center`}>
      <h1 className='text-3xl font-serif font-semibold'>
        Zafarbek Ahmadaliyev
      </h1>

      {/* Matnni tarjima bilan chiqarish */}
      <p
        className='text-xl font-semibold my-4 mx-auto w-full max-w-xl'
        dangerouslySetInnerHTML={{ __html: t('intro') }}
      />

      <div className='flex justify-center items-center gap-x-5 mb-4'>
        <Link
          to='tel:+998940401801'
          className='border px-4 py-2 rounded-xl shadow-inner shadow-cyan-500 font-semibold'
        >
          {t('contactd')}
        </Link>
        <Link
          to='/about'
          className='border px-4 py-2 rounded-xl shadow-inner shadow-green-500 font-semibold'
        >
          {t('aboutb')}
        </Link>
      </div>
      <Driver />


    </section>
  )
}

export default Home
