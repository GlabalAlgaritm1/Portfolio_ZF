import React, { useState } from 'react';
import { Elements } from '../Assets/Data';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTitle from '../Components/useTitle';



const TELEGRAM_BOT_TOKEN = '8314792220:AAGcxtFBHaXLmd4uaTm5udxhNd-ZANtIGzA'; // xavfsiz joyda saqlang
const CHAT_ID = '7764198922';

const Contact = () => {
  useTitle("Contact")
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const text = `
📩 Foydalanuvchi Ma'lumotlari:
👤 Ism: ${form.name}
📧 Email: ${form.email}
📱 Telefon: ${form.phone}
💬 Xabar: ${form.message}
    `;

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: CHAT_ID, text }),
        }
      );

      const data = await res.json();
      setLoading(false);

      if (data.ok) {
        toast.success(t("contact.success"));
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error(t("contact.error") + (data.description ? `: ${data.description}` : ''));
      }
    } catch (err) {
      setLoading(false);
      toast.error(t("contact.error") + `: ${err.message}`);
    }
  };

  return (
    <section className={`${Elements.Container} py-4`}>
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="my-3 text-2xl border-b border-l rounded-b-lg rounded-lg w-60 text-center shadow-inner shadow-cyan-500 py-1">
        {t("contact.title")}
      </h2>

      <form onSubmit={handleSubmit} className='flex flex-col items-center w-full max-w-[600px] mx-auto'>
        <div className="flex flex-col md:flex-row items-center gap-5 mb-5 w-full">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder={t("contact.name")} 
            required
            autoComplete='off'
            className='bg-black border rounded-md w-full py-3 px-3 placeholder-white font-semibold focus:outline-none hover:bg-white/10 transition duration-300'
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder={t("contact.email")}
            required
            autoComplete='off'
            className='bg-black border rounded-md w-full py-3 px-3 placeholder-white font-semibold focus:outline-none hover:bg-white/10 transition duration-300'
          />
        </div>

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          type="tel"
          placeholder={t("contact.phone")}
          required
          autoComplete='off'
          className='bg-black border rounded-md w-full py-3 px-3 placeholder-white font-semibold focus:outline-none hover:bg-white/10 transition duration-300 mb-5'
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder={t("contact.message")}
          required
          className='w-full bg-transparent border border-white rounded-md py-3 px-3 min-h-[42vh] placeholder-white focus:outline-none mb-5 resize-none'
        />

        <button
          type="submit"
          disabled={loading}
          className='w-full py-3 bg-cyan-500 text-white font-semibold rounded-md flex justify-center items-center gap-2 disabled:opacity-50'
        >
          {loading && <span className="loader-border"></span>}
          {loading ? t("contact.sending") : t("contact.send")}
        </button>
      </form>

      <style>{`
        .loader-border {
          border: 3px solid #fff;
          border-top: 3px solid #06b6d4;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </section>
  );
};

export default Contact;
