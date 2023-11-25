import { getConfigs } from "@helpers/getConfigs";
import { Footer } from "../_components/Footer";
import { Header } from "../_components/Header";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Una Plataforma de Comercio Digital"
};

export default function Page() {
  return (
    <div className="bg-gradient-to-b from-ambient-peach to-ambient-lavender bg-fixed">
      <Header />
      <main className="mx-auto space-y-20 py-20">
        <div className="mx-auto flex max-w-[2024px] flex-col gap-y-20 px-4 md:px-12 lg:px-16">
          <section>
            <div className="grid items-center md:grid-cols-2">
              <div className="max-w-[700px]">
                <div className="3xl:space-y-16 space-y-8 lg:space-y-10 2xl:space-y-12">
                  <div className="space-y-4">
                    <header className="text-center text-[#18172B] md:text-left">
                      <h1>
                        <span className="text-4xl font-bold">
                          Hagamos{" "}
                          <span className="relative inline-block">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="321"
                              height="62"
                              viewBox="0 0 321 62"
                              fill="none"
                              className="absolute -left-[6px] -top-2 max-w-[110%]">
                              <g filter="url(#filter0_ii_1355_49553)">
                                <path
                                  d="M4.26324 26.1514C2.0131 26.1514 7.70095 11.7417 10.8261 4.53684C52.3911 2.07664 142.646 -0.688704 171.148 0.154792C199.65 0.998288 252.403 3.8116 275.217 8.02908L298.656 12.9718L318.813 18.7708C318.813 18.7708 321.985 21.0248 320.689 22.5434C319.392 24.062 316.001 26.1514 316.001 26.1514H296.312L314.126 28.2602C313.032 28.2602 310.188 28.5765 307.563 29.8417C305.961 30.6135 305.325 30.9014 305.144 30.9687C304.016 32.0582 301.631 34.4038 300.531 35.6408L296.312 40.3854C295.843 42.3184 294.622 44.82 294.906 48.2932C295.189 51.7664 297.718 50.9291 296.312 56.201C295.187 60.4184 292.406 61.8243 291.156 62L2.85705 57.2553C1.76324 57.2553 -0.330643 56.7282 0.0443804 54.6194C0.513159 51.9835 6.60728 26.1514 4.26324 26.1514Z"
                                  fill="url(#paint0_linear_1355_49553)"
                                />
                              </g>
                              <defs>
                                <filter
                                  id="filter0_ii_1355_49553"
                                  x="0"
                                  y="0"
                                  width="337.569"
                                  height="67.5229"
                                  filterUnits="userSpaceOnUse"
                                  colorInterpolationFilters="sRGB">
                                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                  />
                                  <feOffset dx="26.0367" dy="2.36697" />
                                  <feGaussianBlur stdDeviation="8.28441" />
                                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                  <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0.956863 0 0 0 0 0.721569 0 0 0 0 0.588235 0 0 0 1 0"
                                  />
                                  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1355_49553" />
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                  />
                                  <feOffset dx="61.5413" dy="7.10092" />
                                  <feGaussianBlur stdDeviation="2.76147" />
                                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                  <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 1 0 0 0 0 0.741176 0 0 0 0 0.537255 0 0 0 1 0"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in2="effect1_innerShadow_1355_49553"
                                    result="effect2_innerShadow_1355_49553"
                                  />
                                </filter>
                                <linearGradient
                                  id="paint0_linear_1355_49553"
                                  x1="-7.48718e-07"
                                  y1="46.4202"
                                  x2="307.005"
                                  y2="33.3473"
                                  gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#FFC691" />
                                  <stop offset="1" stopColor="#FFC691" stopOpacity="0.38" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <span className="relative">crecer</span>
                          </span>{" "}
                          su negocio.
                          <br />
                          Inversión mínima de:
                        </span>
                      </h1>
                    </header>
                    <div className="text-center font-medium text-[#18172B] md:text-left">
                      <p className="text-[114px] leading-none tracking-tight md:text-[145px]">
                        <span className="relative inline-block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="335"
                            height="91"
                            viewBox="0 0 335 91"
                            fill="none"
                            className="absolute left-3 top-6 md:top-7 md:max-w-[110%]">
                            <g filter="url(#filter0_ii_1355_49556)">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.769 4.70787C10.5006 9.0414 6.37205 17.7085 8.00532 17.7085C9.41196 17.7085 6.63224 28.3283 5.43453 32.9041L5.4345 32.9042L5.43441 32.9045L5.43432 32.9049L5.43429 32.905C5.18341 33.8635 5.00199 34.5566 4.94305 34.8312C4.78069 35.5877 5.25584 36.0058 5.83425 36.2201C3.82514 40.4381 1.88812 45.1665 3.09448 45.1665C4.50112 45.1665 1.7214 55.7863 0.523689 60.3621L0.523659 60.3622C0.272674 61.3211 0.0911644 62.0146 0.0322136 62.2892C-0.239997 63.5576 1.27985 63.8747 2.0738 63.8747L5.29194 63.9186C3.49979 67.7992 1.99748 71.7092 3.09448 71.7092C4.50112 71.7092 1.72139 82.3291 0.523682 86.9049C0.272686 87.8638 0.0911662 88.5573 0.0322136 88.832C-0.239997 90.1003 1.27985 90.4174 2.0738 90.4174L200.619 90.5199L213.76 90.929L318.391 90.5253C319.299 90.4196 321.318 89.5741 322.134 87.0374C322.91 84.6284 322.425 83.4716 321.947 82.3317C321.501 81.2683 321.062 80.2196 321.658 78.1827C321.983 77.8801 322.482 77.5185 323.005 77.1404C323.578 76.7263 324.177 76.2924 324.604 75.8946C325.413 75.1412 325.456 74.508 325.498 73.8838C325.544 73.2161 325.588 72.5588 326.569 71.7759C328.146 70.5162 328.863 69.9651 328.955 69.3241C329.064 68.5679 328.303 67.6866 327.06 65.369L323.835 61.0362L321.491 60.9488C321.743 60.5595 321.965 60.1058 322.134 59.5794C322.801 57.509 322.71 55.8245 322.627 54.2841C322.498 51.8819 322.388 49.8303 325.197 47.2129C325.569 46.8662 325.824 46.5561 326.066 46.2613C326.356 45.9089 326.628 45.5784 327.06 45.2331C327.88 44.0872 329.726 43.8973 330.028 43.8662C330.056 43.8634 330.071 43.8619 330.07 43.8611C330.07 43.8601 330.051 43.8602 330.009 43.8602H330.006C329.93 43.8603 329.882 43.8648 329.852 43.8675C329.827 43.8699 329.816 43.8709 329.813 43.8666C329.811 43.8632 329.813 43.8566 329.818 43.8449C329.845 43.7775 329.939 43.5405 329.553 42.7743C329.234 42.1401 327.805 42.14 326.242 42.1398C324.68 42.1397 322.985 42.1395 322.134 41.5054C320.433 40.237 327.551 40.1992 327.551 40.1992C327.551 40.1992 330.3 39.7415 330.3 37.911C330.3 37.0763 330.444 36.7173 330.553 36.4437C330.683 36.1172 330.764 35.912 330.497 35.1652C330.37 34.8091 329.86 34.531 329.176 34.3143C329.702 34.1335 330.104 33.9666 330.301 33.7924C331.343 32.869 331.353 32.0419 331.363 31.24C331.367 30.8674 331.372 30.5002 331.48 30.1313C331.971 28.4533 331.971 27.0889 331.971 26.0126C331.971 25.2701 330.752 24.7251 329.759 24.2809C328.954 23.9211 328.298 23.6275 328.555 23.3484C328.701 23.3022 329.168 23.1262 330.301 22.6739C331.338 22.2594 331.332 22.2312 331.264 21.9571C331.21 21.7337 331.115 21.347 331.514 20.4543C331.514 20.4543 334.426 19.6058 334.917 18.8689C335.408 18.132 333.556 16.0151 333.556 16.0151L323.835 12.5271L306.822 9.14715C290.263 6.61045 251.972 4.156 231.284 3.64866C226.861 3.54021 220.39 3.58438 212.654 3.73535L212.535 3.65551C200.203 1.76647 171.463 1.44573 149.048 1.19558C141.363 1.10981 134.421 1.03235 129.139 0.902812C108.451 0.395472 42.939 3.22812 12.769 4.70787Z"
                                fill="url(#paint0_linear_1355_49556)"
                              />
                            </g>
                            <defs>
                              <filter
                                id="filter0_ii_1355_49556"
                                x="0"
                                y="-8.15723"
                                width="356"
                                height="103.086"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feColorMatrix
                                  in="SourceAlpha"
                                  type="matrix"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  result="hardAlpha"
                                />
                                <feOffset dx="34" dy="-9" />
                                <feGaussianBlur stdDeviation="10.5" />
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                <feColorMatrix
                                  type="matrix"
                                  values="0 0 0 0 0.956863 0 0 0 0 0.721569 0 0 0 0 0.588235 0 0 0 1 0"
                                />
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1355_49556" />
                                <feColorMatrix
                                  in="SourceAlpha"
                                  type="matrix"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  result="hardAlpha"
                                />
                                <feOffset dx="24" dy="4" />
                                <feGaussianBlur stdDeviation="3" />
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                <feColorMatrix
                                  type="matrix"
                                  values="0 0 0 0 1 0 0 0 0 0.735096 0 0 0 0 0.525 0 0 0 1 0"
                                />
                                <feBlend
                                  mode="normal"
                                  in2="effect1_innerShadow_1355_49556"
                                  result="effect2_innerShadow_1355_49556"
                                />
                              </filter>
                              <linearGradient
                                id="paint0_linear_1355_49556"
                                x1="263.752"
                                y1="45.8428"
                                x2="344.343"
                                y2="45.8428"
                                gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FFC691" />
                                <stop offset="1" stopColor="#FFC691" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className="relative inline-block w-[264px] text-right md:w-[330px]">
                            $0<span className="text-[89px] md:text-[120px]">.00</span>
                          </span>
                        </span>
                      </p>
                      <p>
                        Comisión única de:{" "}
                        <span className="font-semibold">
                          ${new Intl.NumberFormat().format(getConfigs("platform").plans.Free.costs.fixed_commission)}{" "}
                          COP + {getConfigs("platform").plans.Free.costs.variable_commission}%
                        </span>{" "}
                        por venta{" "}
                        <button aria-label="open 30-day SEC yield dialog" type="button">
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            role="presentation"
                            className="inline-block h-[1.2em] align-[-0.25em]">
                            <path d="M10.748 10.798h.017c.422 0 .765.343.765.765v2.381a1 1 0 01-1 1h-.285a.745.745 0 000 1.49h4.01a.745.745 0 100-1.49H14a1 1 0 01-1-1v-3.642a1 1 0 00-1-1h-1.252a.748.748 0 000 1.496zm.223-2.927a.965.965 0 00.547.507c.132.05.277.073.435.073.325 0 .583-.09.772-.27a.935.935 0 00.29-.705.913.913 0 00-.29-.699c-.19-.185-.447-.277-.772-.277a1.255 1.255 0 00-.435.073 1.029 1.029 0 00-.33.198.934.934 0 00-.29.705c0 .14.024.272.073.395zM21 12a9 9 0 11-18 0 9 9 0 0118 0zm-1.5 0a7.5 7.5 0 10-15 0 7.5 7.5 0 0015 0z" />
                          </svg>
                        </button>
                      </p>
                      <p className="opacity-60">
                        Pagarás impuestos sobre la comisión{" "}
                        <button aria-label="open return since inception dialog" type="button">
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            role="presentation"
                            className="inline-block h-[1.2em] align-[-0.25em]">
                            <path d="M10.748 10.798h.017c.422 0 .765.343.765.765v2.381a1 1 0 01-1 1h-.285a.745.745 0 000 1.49h4.01a.745.745 0 100-1.49H14a1 1 0 01-1-1v-3.642a1 1 0 00-1-1h-1.252a.748.748 0 000 1.496zm.223-2.927a.965.965 0 00.547.507c.132.05.277.073.435.073.325 0 .583-.09.772-.27a.935.935 0 00.29-.705.913.913 0 00-.29-.699c-.19-.185-.447-.277-.772-.277a1.255 1.255 0 00-.435.073 1.029 1.029 0 00-.33.198.934.934 0 00-.29.705c0 .14.024.272.073.395zM21 12a9 9 0 11-18 0 9 9 0 0118 0zm-1.5 0a7.5 7.5 0 10-15 0 7.5 7.5 0 0015 0z" />
                          </svg>
                        </button>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="copy-body mx-auto max-w-[573px] text-center md:mx-0 md:text-left">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, temporibus tenetur? Pariatur ullam
                      similique fugit, sequi a ad maiores aliquam fuga alias itaque officia, magnam doloribus est ea ut
                      cum? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat minima, vel ratione
                      deleniti impedit nemo odit corrupti. Est esse autem quis.
                    </p>
                  </div>
                  <div className="flex flex-row md:items-center lg:space-x-8">
                    <Link className="button button-primary" href={`${getConfigs("application").URLs.www}/get-started`}>
                      Empezar gratis
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative xl:mr-20">
                <div className="relative ml-auto hidden h-[80%] w-[80%] md:block xl:h-full xl:w-full">
                  <picture>
                    <Image width={736} height={508} alt="a city landscape" loading="eager" src="/images/city.webp" />
                  </picture>
                </div>
              </div>
            </div>
            <div className="sm:pl-10 md:pl-20 lg:pl-32 2xl:pl-28">
              <div className="mx-auto hidden max-w-[1076px] pt-20 sm:block">
                <div className="grid auto-cols-auto grid-flow-col grid-rows-2 items-center gap-x-6 text-sm text-primary-dark opacity-60 2xl:gap-x-10">
                  <div className="text-3xl font-semibold">1.2K+</div>
                  <span className="self-start">Clientes de confianza</span>
                  <div className="text-3xl font-semibold">$30M+</div>
                  <span className="self-start">En ventas realizadas</span>
                  <div className="text-3xl font-semibold">
                    <div className="inline-flex items-baseline space-x-2">
                      <span>4.8</span>
                      <svg
                        fill="#230B59"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 21 21"
                        className="h-[22px] w-[22px]">
                        <path
                          d="M9.94 1.342c.239-.737 1.282-.737 1.521 0l1.866 5.742a.8.8 0 0 0 .76.553h6.04c.774 0 1.097.992.47 1.448l-4.886 3.549a.8.8 0 0 0-.29.894l1.866 5.743c.24.737-.604 1.35-1.231.895l-4.886-3.55a.8.8 0 0 0-.94 0l-4.885 3.55c-.627.455-1.47-.158-1.231-.895l1.866-5.743a.8.8 0 0 0-.29-.894L.803 9.084c-.627-.455-.305-1.447.47-1.447h6.039a.8.8 0 0 0 .76-.552L9.94 1.341z"
                          fill="#230B59"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="self-start">App Store</span>
                  <div className="text-3xl font-semibold">
                    <div className="inline-flex items-baseline space-x-2">
                      <span>4.9</span>
                      <svg
                        fill="#230B59"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 21 21"
                        className="h-[22px] w-[22px]">
                        <path
                          d="M9.94 1.342c.239-.737 1.282-.737 1.521 0l1.866 5.742a.8.8 0 0 0 .76.553h6.04c.774 0 1.097.992.47 1.448l-4.886 3.549a.8.8 0 0 0-.29.894l1.866 5.743c.24.737-.604 1.35-1.231.895l-4.886-3.55a.8.8 0 0 0-.94 0l-4.885 3.55c-.627.455-1.47-.158-1.231-.895l1.866-5.743a.8.8 0 0 0-.29-.894L.803 9.084c-.627-.455-.305-1.447.47-1.447h6.039a.8.8 0 0 0 .76-.552L9.94 1.341z"
                          fill="#230B59"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="self-start">Play Store</span>
                </div>
              </div>
              <div className="mx-auto block max-w-[1076px] pt-20 sm:hidden">
                <div className="col-span-full grid grid-cols-2 gap-y-6 text-sm text-primary-dark opacity-60">
                  <div className="flex flex-shrink-0 flex-col items-center space-y-3 text-center">
                    <div className="text-3xl font-semibold">1K+</div>
                    <span className="">Clientes de confianza</span>
                  </div>
                  <div className="flex flex-shrink-0 flex-col items-center space-y-3 text-center">
                    <div className="text-3xl font-semibold">$30M+</div>
                    <span>En ventas realizadas</span>
                  </div>
                  <div className="flex flex-shrink-0 flex-col items-center space-y-3 text-center">
                    <div className="text-3xl font-semibold">
                      <div className="inline-flex items-baseline space-x-2">
                        <span>4.8</span>
                        <svg
                          fill="#230B59"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 21 21"
                          className="h-[22px] w-[22px]">
                          <path
                            d="M9.94 1.342c.239-.737 1.282-.737 1.521 0l1.866 5.742a.8.8 0 0 0 .76.553h6.04c.774 0 1.097.992.47 1.448l-4.886 3.549a.8.8 0 0 0-.29.894l1.866 5.743c.24.737-.604 1.35-1.231.895l-4.886-3.55a.8.8 0 0 0-.94 0l-4.885 3.55c-.627.455-1.47-.158-1.231-.895l1.866-5.743a.8.8 0 0 0-.29-.894L.803 9.084c-.627-.455-.305-1.447.47-1.447h6.039a.8.8 0 0 0 .76-.552L9.94 1.341z"
                            fill="#230B59"
                          />
                        </svg>
                      </div>
                    </div>
                    <span>App Store</span>
                  </div>
                  <div className="flex flex-shrink-0 flex-col items-center space-y-3 text-center">
                    <div className="text-3xl font-semibold">
                      <div className="inline-flex items-baseline space-x-2">
                        <span>4.9</span>
                        <svg
                          fill="#230B59"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 21 21"
                          className="h-[22px] w-[22px]">
                          <path
                            d="M9.94 1.342c.239-.737 1.282-.737 1.521 0l1.866 5.742a.8.8 0 0 0 .76.553h6.04c.774 0 1.097.992.47 1.448l-4.886 3.549a.8.8 0 0 0-.29.894l1.866 5.743c.24.737-.604 1.35-1.231.895l-4.886-3.55a.8.8 0 0 0-.94 0l-4.885 3.55c-.627.455-1.47-.158-1.231-.895l1.866-5.743a.8.8 0 0 0-.29-.894L.803 9.084c-.627-.455-.305-1.447.47-1.447h6.039a.8.8 0 0 0 .76-.552L9.94 1.341z"
                            fill="#230B59"
                          />
                        </svg>
                      </div>
                    </div>
                    <span>Play Store</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
