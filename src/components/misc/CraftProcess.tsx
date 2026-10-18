import { craftSteps } from "@/constants/HomeContent"
import Image from "next/image"

export default function CraftProcess() {
  return (
    <section className="relative overflow-hidden bg-[#F8F3EA] py-10 md:py-12 lg:py-14">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >

        {/* MAIN BROWN ORGANIC SHAPE
            Wide enough to contain ALL 4 steps */}
        <div
          className="
            absolute
            left-0
            top-0
            h-full
            w-[92%]
            bg-[#AD7A43]
            rounded-tr-[66%]
            rounded-br-[41%]
            md:w-[91%]
            lg:w-[80%]
          "
        />
{/* 80%     border-top-right-radius: 66%;
    border-bottom-right-radius: 41%; */}
        {/* subtle darker bottom-left */}
        {/* <div
          className="
            absolute
            -bottom-[30%]
            -left-[8%]
            h-[55%]
            w-[42%]
            rounded-full
            bg-[#8E6035]/20
          "
        /> */}

        {/* top-left soft circle */}
        {/* <div
          className="
            absolute
            -left-[110px]
            -top-[150px]
            h-[330px]
            w-[330px]
            rounded-full
            bg-[#D9B382]/20
          "
        /> */}

     
        {/* LEFT LEAF */}

        
      </div>
   {/* =================================================
            RIGHT SIDE LEAF
        ================================================== */}

        {/* <svg
          className="
            absolute
            right-[-30px]
            top-[18%]
            h-[470px]
            w-[280px]
            text-[#B8874A]/55
            md:right-[-10px]
            md:h-[520px]
            md:w-[320px]
          "
          viewBox="0 0 360 580"
          fill="none"
        >
          <path
            d="M335 20C278 82 267 155 274 225C282 307 242 375 188 431C143 478 91 526 30 560"
            stroke="currentColor"
            strokeWidth="1.2"
          />

          <path
            d="M276 130C313 120 335 99 350 70"
            stroke="currentColor"
            strokeWidth="1.2"
          />

          <path
            d="M271 184C306 181 330 163 349 137"
            stroke="currentColor"
            strokeWidth="1.2"
          />

          <path
            d="M268 244C305 247 331 232 351 208"
            stroke="currentColor"
            strokeWidth="1.2"
          />

          <path
            d="M239 337C274 344 302 335 326 313"
            stroke="currentColor"
            strokeWidth="1.2"
          />

          <path
            d="M204 402C236 413 267 407 293 388"
            stroke="currentColor"
            strokeWidth="1.2"
          />

          <path
            d="M165 457C192 473 222 472 249 458"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg> */}
        <div id='right-leaf-craft-process'  className="absolute right-[-30px] top-[-4%] h-[470px] w-[280px]
         text-[#b8874a94]/55 md:right-[10px] md:h-[24rem] md:w-[24rem] rotate-[-4deg]">
          <img alt="/bg-svgs/right-leaf.svg" src="/bg-svgs/right-leaf.svg" />
        </div>

 <div id='left-leaf-craft-process'  className="absolute left-[30px] top-[-4%] h-[470px] w-[280px]
         text-[#ffffff] md:right-[10px] md:h-[18rem] md:w-[18rem] rotate-[171deg]">
          <img alt="/bg-svgs/right-leaf.svg" src="/bg-svgs/right-leaf.svg" />
        </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="container-custom relative z-10 w-[80%] float-left">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="mx-auto mb-9 max-w-3xl text-center md:mb-10">

          {/* Eyebrow */}

          <div className="mb-3 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#F7EBDD]/70" />

            <span
              className="
                font-body
                text-[9px]
                font-medium
                uppercase
                tracking-[0.42em]
                text-[#FFF5E8]
                md:text-[10px]
              "
            >
              Our Journey
            </span>

            <span className="h-px w-10 bg-[#F7EBDD]/70" />
          </div>

          {/* Heading */}

          <h2
            className="
              font-heading
              text-4xl
              font-normal
              leading-none
              tracking-[-0.035em]
              text-[#FFF8EF]
              sm:text-5xl
              md:text-6xl
              lg:text-[58px]
            "
          >
            Our Craft Process
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-3
              max-w-2xl
              font-body
              text-sm
              leading-6
              text-[#F8ECDD]/90
              md:text-base
            "
          >
            Discover the meticulous journey behind each handcrafted piece
          </p>
        </div>

        {/* =================================================
            TIMELINE
        ================================================== */}

        <div className="relative">

          {/* Connecting line */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-[8%]
              right-[8%]
              top-[58px]
              hidden
              h-px
              bg-[#F7EBDD]/75
              lg:block
            "
          />

          {/* FOUR ITEMS */}

          <div
            className="
              grid
              grid-cols-2
              gap-10
              sm:grid-cols-2
              lg:grid-cols-4
              lg:gap-2
            "
          >
            {craftSteps.map((step) => (
              <div
                key={step.id}
                className="
                  relative
                  text-center
                  px-2
                  lg:px-3
                "
              >

                {/* =================================================
                    IMAGE CIRCLE
                ================================================== */}

                <div
                  className="
                    relative
                    mx-auto
                    mb-5
                    h-[104px]
                    w-[104px]
                    sm:h-[108px]
                    sm:w-[108px]
                    md:h-[112px]
                    md:w-[112px]
                  "
                >

                  {/* Outer ring */}

                  <div
                    className="
                      absolute
                      inset-0
                      rounded-full
                      border
                      border-[#F7EBDD]/85
                    "
                  />

                  {/* Image */}

                  <div
                    className="
                      absolute
                      inset-[5px]
                      overflow-hidden
                      rounded-full
                    "
                  >
                    <Image
                      src={step.image || "/placeholder.svg"}
                      alt={step.title}
                      fill
                      sizes="112px"
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        hover:scale-105
                      "
                    />
                  </div>

                  {/* Number */}

                  <div
                    className="
                      absolute
                      -bottom-1
                      -left-2
                      flex
                      h-[30px]
                      w-[30px]
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#A97843]
                      bg-[#F8F3EA]
                      font-body
                      text-[9px]
                      font-semibold
                      text-[#946332]
                      shadow-[0_3px_10px_rgba(60,35,15,0.12)]
                    "
                  >
                    {String(step.id).padStart(2, "0")}
                  </div>
                </div>

                {/* =================================================
                    TITLE
                ================================================== */}

                <h3
                  className="
                    font-heading
                    text-[21px]
                    font-normal
                    leading-[1.05]
                    tracking-[-0.025em]
                    text-[#FFF8EF]
                    sm:text-[22px]
                    md:text-[23px]
                  "
                >
                  {step.title}
                </h3>

                {/* =================================================
                    DESCRIPTION
                ================================================== */}

                <p
                  className="
                    mx-auto
                    mt-2
                    max-w-[175px]
                    font-body
                    text-[11px]
                    leading-[1.55]
                    text-[#F8ECDD]/90
                    sm:text-[12px]
                    md:text-[12px]
                    
                  "
                >
                  {step.description}
                </p>

                {/* =================================================
                    ICON
                ================================================== */}

                <div
                  className="
                    mx-auto
                    mt-4
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#F7EBDD]/60
                    text-[#F7EBDD]
                  "
                >

                  {/* STEP 1 */}

                  {step.id === 1 && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M20.5 3.5C13 3.5 6 7 5 14c-.5 3.5 1.5 5.5 4.5 5.5 5.5 0 9.5-5.5 11-16Z" />
                      <path d="M4 21c2-5 5-8 10-10" />
                    </svg>
                  )}

                  {/* STEP 2 */}

                  {step.id === 2 && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="m15 5 4 4" />
                      <path d="M13 7 4 16l-1 4 4-1 9-9" />
                      <path d="m16 4 1-1a2.12 2.12 0 0 1 3 3l-1 1" />
                    </svg>
                  )}

                  {/* STEP 3 */}

                  {step.id === 3 && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06-1.42 1.42-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V20h-2v-.08a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06-1.42-1.42.06-.06A1.65 1.65 0 0 0 9.6 15a1.65 1.65 0 0 0-1.51-1H8v-2h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06 1.42-1.42.06.06a1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.51V6h2v.08a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06 1.42 1.42-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21v2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
                    </svg>
                  )}

                  {/* STEP 4 */}

                  {step.id === 4 && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  )}

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}