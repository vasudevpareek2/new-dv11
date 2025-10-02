import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen pt-20 bg-gray-50'>
        <div className='container mx-auto px-4 py-12'>
          <h1 className='text-4xl font-bold text-center mb-12'>Contact Us</h1>
          <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12'>
            {/* Contact Form */}
            <div className='bg-white p-8 rounded-lg shadow-md'>
              <h2 className='text-2xl font-semibold mb-6'>Send us a Message</h2>
              <form className='space-y-6'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Full Name *
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                  />
                </div>

                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Email Address *
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                  />
                </div>

                <div>
                  <label
                    htmlFor='phone'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                  />
                </div>

                <div>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Your Message *
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    rows={5}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                  />
                </div>

                <button
                  type='submit'
                  className='w-full bg-amber-600 text-white py-3 px-6 rounded-md hover:bg-amber-700 transition-colors font-medium'
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className='text-2xl font-semibold mb-6'>Contact Information</h2>
              <div className='space-y-6'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0 bg-amber-100 p-3 rounded-full'>
                    <svg
                      className='h-6 w-6 text-amber-600'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                  </div>
                  <div className='ml-4'>
                    <h3 className='text-lg font-medium text-gray-900'>Location</h3>
                    <p className='mt-1 text-gray-600'>
                      Building No./Flat No.: Khasra no 3133/3127
                      <br />
                      Name Of Premises/Building: Samla Ki Dhani
                      <br />
                      Road/Street: Kaharo Ka Chouraha
                      <br />
                      City/Town/Village: Pushkar
                      <br />
                      District: Ajmer
                      <br />
                      State: Rajasthan
                      <br />
                      PIN Code: 305022
                    </p>
                  </div>
                </div>
                
                <div className='flex items-start'>
                  <div className='flex-shrink-0 bg-amber-100 p-3 rounded-full'>
                    <svg
                      className='h-6 w-6 text-amber-600'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                      />
                    </svg>
                  </div>
                  <div className='ml-4'>
                    <h3 className='text-lg font-medium text-gray-900'>Phone</h3>
                    <p className='mt-1 text-gray-600'>+91 87420 00006</p>
                    <p className='mt-1 text-gray-600'>+91 96600 88590</p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='flex-shrink-0 bg-amber-100 p-3 rounded-full'>
                    <svg
                      className='h-6 w-6 text-amber-600'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                      />
                    </svg>
                  </div>
                  <div className='ml-4'>
                    <h3 className='text-lg font-medium text-gray-900'>Email</h3>
                    <p className='mt-1 text-gray-600'>dolcevitapushkar@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className='mt-8'>
                <h3 className='text-lg font-medium text-gray-900 mb-4'>Follow Us</h3>
                <div className='flex space-x-4'>
                  <a href='#' className='text-gray-400 hover:text-amber-600'>
                    <span className='sr-only'>Facebook</span>
                    <svg
                      className='h-6 w-6'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                  <a href='#' className='text-gray-400 hover:text-amber-600'>
                    <span className='sr-only'>Instagram</span>
                    <svg
                      className='h-6 w-6'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.415-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                  <a href='#' className='text-gray-400 hover:text-amber-600'>
                    <span className='sr-only'>Twitter</span>
                    <svg
                      className='h-6 w-6'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className='mt-16 bg-gray-200 rounded-lg overflow-hidden h-96'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.123456789012!2d74.55555555555556!3d26.490000000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396be6d8fcb7cd01%3A0xcbaf8f12b890863c!2sPushkar%20Lake!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              title='Dolce Vita Pushkar Location'
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
