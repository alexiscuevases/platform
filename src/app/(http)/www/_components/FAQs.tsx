"use client";

import { getConfigs } from "@helpers/getConfigs";
import Image from "next/image";
import { useState } from "react";

export function GeneralFAQs() {
  const [questionShowing, setQuestion] = useState<number>(0);
  const toggle = (question: number) => {
    setQuestion(prevQuestion => (prevQuestion === question ? 0 : question));
  };

  return (
    <>
      <div className="border-t-[1px] border-primary-dark border-opacity-60">
        <button
          onClick={() => toggle(1)}
          className="relative flex w-full items-center justify-between py-6 text-left font-GT_Alpina text-[24px] font-thin italic md:py-8 md:text-[34px]">
          <p className="w-full">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <div>
            <svg
              width="37"
              className={`float-right mx-4 block ${questionShowing == 1 && "rotate-180"}`}
              height="18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="m1 1 18.5 18L38 1" stroke="#230B59" />
            </svg>
          </div>
        </button>
      </div>
      {questionShowing == 1 && (
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 space-y-4 pb-8 lg:grid-cols-2 lg:space-x-10 lg:space-y-0">
            <div className="max-w-[750px] space-y-6 pb-4">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id pariatur quia, recusandae harum provident
                voluptatum, eos labore numquam odit vel rerum praesentium dicta nisi ducimus at consequuntur rem
                suscipit qui? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium nisi facilis dolores
                optio quod magni atque est, at veniam pariatur unde placeat fuga aut a voluptas nostrum tenetur
                doloremque sunt!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores rem magnam quibusdam tenetur, odio
                suscipit enim autem in consequatur sapiente consectetur reiciendis assumenda veritatis! Sequi eligendi
                ab molestias officiis possimus.
              </p>
              <div className="hidden lg:inline-flex">
                <a className="button button-primary" href={`${getConfigs("application").URLs.www}/get-started`}>
                  Empezar gratis
                </a>
              </div>
            </div>
            <div className="grid lg:justify-center">
              <Image
                height={200}
                width={200}
                alt="A fortune teller’s crystal ball filled with money."
                src="/images/crystal_ball.webp"
              />
            </div>
            <div className="lg:hidden">
              <a className="button button-primary" href={`${getConfigs("application").URLs.www}/get-started`}>
                Empezar gratis
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
