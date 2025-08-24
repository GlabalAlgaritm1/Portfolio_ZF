import React, { useState } from 'react'
import { Elements } from '../Assets/Data'
import { useTranslation } from 'react-i18next'

const Contact = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert(t("contact.success")) // i18n translation
    }, 2000)
  }

  return (
    <section className={`${Elements.Container} py-3`}>
      <h2 className="my-3 text-2xl border-b border-l rounded-b-lg rounded-lg w-60 text-center shadow-inner shadow-cyan-500 py-1">
        {t("contact.title")}
      </h2>
      <form onSubmit={handleSubmit} className='flex flex-col items-center w-full'>
        <div className="flex flex-col md:flex-row items-center gap-5 mb-5 w-full max-w-[600px]">
          <label className="sr-only" htmlFor="name">{t("contact.name")}</label>
          <input 
            id="name"
            className='bg-black border rounded-md w-full py-3 px-3 focus:outline-none hover:bg-white/10
              transition duration-300 ease-in-out placeholder:text-white font-semibold' 
            type="text" placeholder={t("contact.name")} required 
          />
          <label className="sr-only" htmlFor="email">{t("contact.email")}</label>
          <input 
            id="email"
            className='bg-black border rounded-md w-full py-3 px-3 focus:outline-none hover:bg-white/10
              transition duration-300 ease-in-out placeholder:text-white font-semibold' 
            type="email" placeholder={t("contact.email")} required 
          />
        </div>

        <label className="sr-only" htmlFor="phone">{t("contact.phone")}</label>
        <input 
          id="phone"
          className='bg-black border rounded-md w-full max-w-[600px] py-3 px-3 focus:outline-none hover:bg-white/10
              transition duration-300 ease-in-out placeholder:text-white font-semibold' 
          type="tel" placeholder={t("contact.phone")} 
        />

        <label className="sr-only" htmlFor="message">{t("contact.message")}</label>
        <textarea 
          id="message"
          className='w-full max-w-[600px] mt-5 resize-none bg-transparent rounded-md border border-white py-3 px-3 min-h-[42vh] placeholder:text-white focus:outline-none' 
          placeholder={t("contact.message")} required
        ></textarea>

        <button 
          type="submit"
          disabled={loading}
          className='border w-full max-w-[600px] py-3 my-3 rounded-md bg-cyan-500 text-xl font-semibold disabled:opacity-50'
        >
          {loading ? t("contact.sending") : t("contact.send")}
        </button>
      </form>

    </section>
  )
}

export default Contact
