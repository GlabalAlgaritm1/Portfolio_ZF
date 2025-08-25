import React, { useState } from 'react';
import { Elements } from '../Assets/Data';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTitle from '../Components/useTitle';

const TELEGRAM_BOT_TOKEN = '8314792220:AAGcxtFBHaXLmd4uaTm5udxhNd-ZANtIGzA'; // xavfsiz joyda saqlang
const CHAT_ID = '7764198922';

const Contact = () => {
  useTitle("Contact");
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', phone: '', username: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const text = `
📩 ${t("contact.userInfo")}:
👤 ${t("contact.name")}: ${form.name}
📱 ${t("contact.phone")}: ${form.phone}
💬 ${t("contact.message")}: ${form.username}
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
        setForm({ name: '', phone: '', username: '' });
      } else {
        toast.error(t("contact.error") + (data.description ? `: ${data.description}` : ''));
      }
    } catch (err) {
      setLoading(false);
      toast.error(t("contact.error") + `: ${err.message}`);
    }
  };

  return (
    <section className={`${Elements.Container}`}>
      <div className="bg-transparent">
        <div className="max-w-screen-xxl mx-auto px-0 h-auto md:container-padding md:pb-28 md:pt-32 pt-0 max-md:pb-32 max-md:pt-5 max-sm:pb-32 max-sm:pt-5">
          <div className="relative max-w-screen-xxl mx-auto px-4 bg-gray-700 md:px-20 md:rounded-3xl py-20 max-md:rounded-md max-sm:rounded-md">
            
            {/* Title */}
            <div className="lg:mb-0 mb-6 text-center lg:text-left">
              <p className="w-full lg:w-7/12 font-heading lg:text-5xl mb-4 text-3xl text-white">
                {t("contact.title")}
              </p>
              <p className="w-full text-gray-100 lg:w-2/5 text-lg">
                {t("contact.subtitle")}
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="lg:absolute lg:-top-14 xl:-top-20 lg:right-10 xl:right-20 
                         max-w-[430px] w-full mx-auto md:p-9 p-4 
                         backdrop-blur-md bg-gray-800/50 border border-gray-700 
                         rounded-3xl shadow-3xl"
              id="lead-form"
            >
              {/* Name */}
              <label className="mb-4 block">
                <p className="mb-2 md:text-lg text-gray-100 text-md">{t("contact.name")}</p>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("contact.namePlaceholder")}
                  required
                  className="w-full border bg-gray-800 border-gray-600 focus:border-primary 
                             focus:outline-none focus:ring-primary h-14 p-4 
                             placeholder-gray-300 rounded-lg text-gray-200"
                />
              </label>

              {/* Phone */}
              <label className="mb-4 block">
                <p className="mb-2 md:text-lg text-gray-100 text-md">{t("contact.phone")}</p>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={t("contact.phonePlaceholder")}
                  required
                  className="w-full border bg-gray-800 border-gray-600 focus:border-primary 
                             focus:outline-none focus:ring-primary h-14 p-4 
                             placeholder-gray-300 rounded-lg text-gray-200"
                />
              </label>

              {/* Message */}
              <label className="mb-4 block">
                <p className="mb-2 md:text-lg text-gray-100 text-md">{t("contact.message")}</p>
                <textarea
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder={t("contact.messagePlaceholder")}
                  required
                  className="w-full border bg-gray-800 border-gray-600 focus:border-primary 
                             focus:outline-none focus:ring-primary h-28 p-4 
                             placeholder-gray-300 rounded-lg text-gray-200 resize-none"
                />
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full bg-primary text-white h-14 p-3 rounded-lg hover:bg-primary/90 transition"
              >
                {loading ? t("contact.loading") : t("contact.send")}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Contact;
