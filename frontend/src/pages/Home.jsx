const Home = () => {
  return (
    <>
      {/* START HERO SECTION */}
      <div
        className="relative flex flex-col items-center justify-center w-full min-h-screen py-20 bg-gray-100"
        id="beranda"
      >
        <div className="max-w-[1200px] sm:pt-20 pt-10 mx-auto px-4">
          <div className="text-center">
            <div className="details">
              <div className="short mb-6">
                <h3 className="text-4xl font-bold mb-2">
                  Sistem Pendukung Keputusan
                </h3>
                <span className="text-xl font-light ">
                  SMA Bina Insan Mandiri Bogor
                </span>
              </div>
              <div className="text sm:mb-16 mb-4">
                <p className="text-base text-gray-600 leading-7 max-w-5xl md:mx-auto mx-5">
                  Sistem Pendukung Keputusan (SPK) yang ada di website ini
                  bertujuan untuk menentukan santri terbaik di SMA Bina Insan
                  Mandiri Bogor, dengan menggunakan berbagai kriteria penilaian
                  yang komprehensif dan objektif guna mendukung transparansi dan
                  akurasi dalam proses pemilihan.
                </p>
              </div>
              <div className="buttons sm:flex sm:flex-row flex-col items-center justify-center sm:space-x-10 space-x-0">
                <div className="orido_tm_boxed_button">
                  <a
                    className="inline-block bg-success text-white font-semibold rounded-xl py-4 px-8 transition-all duration-300 text-sm hover:bg-green-700"
                    href="#peringkat"
                  >
                    Lihat Ranking
                  </a>
                </div>
                <div className="flex items-center justify-center mt-8 sm:mt-0">
                  <a
                    className="text-success font-medium relative text-base group flex"
                    href="#perhitungan"
                  >
                    <p>Lihat perhitungan</p>
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.843 4.21239C20.843 3.79817 20.5072 3.46238 20.093 3.46238L13.343 3.46234C12.9288 3.46233 12.593 3.79812 12.593 4.21233C12.593 4.62655 12.9288 4.96233 13.343 4.96234L19.343 4.96238L19.3429 10.9624C19.3429 11.3766 19.6787 11.7124 20.0929 11.7124C20.5072 11.7124 20.8429 11.3766 20.8429 10.9624L20.843 4.21239ZM4.43731 20.9285L20.6233 4.74271L19.5627 3.68205L3.37665 19.8678L4.43731 20.9285Z"
                        fill="#00ab55"
                      />
                    </svg>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-600 group-hover:w-full"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END HERO SECTION */}

      {/* START RANKING SECTION */}
      <div id="peringkat" className="h-screen">
        RANKING SECTION
      </div>
      {/* END RANKING SECTION */}

      <div id="perhitungan" className="h-screen">
        PERHITUNGAN SECTION
      </div>

      
    </>
  );
};

export default Home;
