"use client";

import { useEffect, useState } from "react";
import { presentationContent } from "../src/presentationData";
import Image from "next/image";
import * as Icons from "lucide-react";
import { ConfettiFireworks } from "@/components/ui/confetti-firework";
import Logo from "@/components/logo";

const { slides } = presentationContent;

function delay(index) {
  return { "--delay": index };
}

function slideClass(name, isActive) {
  return `slide ${name}${isActive ? " is-active" : ""}`;
}

function getInitialSlide() {
  if (typeof window === "undefined") return 0;
  const fromHash = Number(window.location.hash.replace("#", ""));

  if (Number.isInteger(fromHash) && fromHash > 0) {
    return Math.min(fromHash - 1, slides.length - 1);
  }

  return 0;
}

function Badge({ label, index }) {
  return (
    <span className="badge reveal" style={delay(index + 2)}>
      {label}
    </span>
  );
}

// Fallback Icon renderer in case an icon name doesn't exist
function SmartIcon({ name, className }) {
  if (!name) return null;
  const IconComponent = Icons[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

function SlideHeader({ slide }) {
  return (
    <div>
      <p className="eyebrow reveal">{slide.eyebrow}</p>
      <h1 className="slide-title reveal" style={delay(1)}>
        {slide.title}
      </h1>
      <p className="slide-lead reveal" style={delay(2)}>
        {slide.lead}
      </p>
    </div>
  );
}

function Terminal({ lines }) {
  return (
    <div
      className="terminal reveal"
      style={delay(3)}
      aria-label="Python command preview"
    >
      <div className="terminal-top">
        <span />
        <span />
        <span />
      </div>
      <pre>
        {lines.map((line, index) => (
          <code key={`${line}-${index}`}>{line}</code>
        ))}
      </pre>
    </div>
  );
}

function BadgeRow({ badges }) {
  return (
    <div className="badge-row">
      {badges.map((badge, index) => (
        <Badge key={badge} label={badge} index={index} />
      ))}
    </div>
  );
}

function WelcomeSlide({ slide, isActive }) {
  return (
    <section
      className={slideClass("slide-welcome", isActive)}
      aria-label={slide.title}
    >
      <div className="slide-inner hero-grid">
        <div>
          <SlideHeader slide={slide} />
          <BadgeRow badges={slide.badges} />
        </div>
        <div className="hero-visual">
          <Terminal lines={slide.codeLines} />
        </div>
      </div>
    </section>
  );
}

function AboutSlide({ slide, isActive }) {
  return (
    <section
      className={slideClass("slide-about", isActive)}
      aria-label={slide.title}
    >
      <div className="slide-inner split-grid">
        <div>
          <SlideHeader slide={slide} />
          <div className="point-list">
            {slide.points.map((point, index) => (
              <div
                className="point reveal"
                style={delay(index + 3)}
                key={point}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{point}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="screen-placeholder reveal" style={delay(3)}>
          <div className="screen-toolbar">
            <span />
            <span />
            <span />
          </div>
          <Image
            src="/logo-hd.png"
            width={4000}
            height={3000}
            alt={slide.placeholderTitle}
            className="w-auto h-auto object-contain "
          />
        </div>
      </div>
    </section>
  );
}

function PlatformSlide({ slide, isActive }) {
  return (
    <section
      className={slideClass("slide-platform", isActive)}
      aria-label={slide.title}
    >
      <div className="slide-inner split-grid">
        <div>
          <SlideHeader slide={slide} />
          <div className="point-list mt-4">
            {slide.points.map((point, index) => (
              <div
                className="point-complex reveal"
                style={delay(index + 3)}
                key={point.text}
              >
                <div className="point-header flex items-center gap-3">
                  <div className="icon-badge">
                    <SmartIcon
                      name={point.icon}
                      className="w-5 h-5 text-cyan"
                    />
                  </div>
                  <p className="font-bold text-lg">{point.text}</p>
                </div>
                {point.subpoints && (
                  <ul className="subpoint-list">
                    {point.subpoints.map((sub, sIdx) => (
                      <li
                        key={sub}
                        className="subpoint reveal"
                        style={delay(index + 4 + sIdx)}
                      >
                        <span className="subpoint-dot" />
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="screen-placeholder reveal" style={delay(3)}>
          <div className="screen-toolbar">
            <span />
            <span />
            <span />
          </div>
          <Image
            src="/codingforkids.png"
            width={2000}
            height={1000}
            alt={slide.placeholderTitle}
            className="w-full h-auto object-contain "
          />
        </div>
      </div>
    </section>
  );
}

function LearningSlide({ slide, isActive }) {
  return (
    <section
      className={slideClass("slide-learning", isActive)}
      aria-label={slide.title}
    >
      <div className="slide-inner stack-grid items-center">
        <SlideHeader slide={slide} />
        <div className="journey">
          {slide.steps.map((step, index) => (
            <article
              className="journey-step reveal"
              style={delay(index + 3)}
              key={step.label}
            >
              <div className="step-top flex justify-between items-center w-full">
                <span className="step-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <SmartIcon
                  name={step.icon}
                  className="w-5 h-5 text-green op-80"
                />
              </div>
              <h2>{step.label}</h2>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TopicsSlide({ slide, isActive }) {
  return (
    <section
      className={slideClass("slide-topics", isActive)}
      aria-label={slide.title}
    >
      <div className="slide-inner stack-grid">
        <SlideHeader slide={slide} />
        <div className="topic-grid">
          {slide.topics.map((topic, index) => (
            <article
              className="topic-card reveal"
              style={delay(index + 3)}
              key={topic.title}
            >
              <div className="topic-header flex justify-between items-center w-full mb-3">
                <span className="topic-mark" />
                <SmartIcon name={topic.icon} className="w-5 h-5 text-gold" />
              </div>
              <h2>{topic.title}</h2>
              <p>{topic.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommandsSlide({ slide, isActive }) {
  return (
    <section
      className={slideClass("slide-commands", isActive)}
      aria-label={slide.title}
    >
      <div className="slide-inner stack-grid">
        <SlideHeader slide={slide} />
        <div className="command-grid">
          {slide.commands.map((command, index) => (
            <article
              className="command-card reveal"
              style={delay(index + 3)}
              key={command.code}
            >
              <code>{command.code}</code>
              <span>{command.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSlide({ slide, isActive }) {
  return (
    <section
      className={slideClass("slide-skills", isActive)}
      aria-label={slide.title}
    >
      <div className="slide-inner stack-grid">
        <SlideHeader slide={slide} />
        <div className="roadmap-container reveal" style={delay(3)}>
          <div className="roadmap-track-line" />
          {slide.milestones.map((milestone, index) => (
            <div
              className="roadmap-step reveal"
              style={delay(index + 4)}
              key={milestone.title}
            >
              <div className="roadmap-node-wrapper">
                <div className="roadmap-node">
                  <SmartIcon name={milestone.icon} className="w-6 h-6" />
                </div>
                <div className="roadmap-badge">{milestone.label}</div>
              </div>
              <div className="roadmap-content">
                <h3>{milestone.title}</h3>
                <p>{milestone.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementSlide({ slide, isActive }) {
  return (
    <section
      className={slideClass("slide-achievement", isActive)}
      aria-label={slide.title}
    >
      <div className="slide-inner achievement-grid">
        <div>
          <SlideHeader slide={slide} />
          <BadgeRow badges={slide.badges} />
        </div>
        <div className="certificate reveal" style={delay(3)}>
          <p>Төгсөлтийн гэрчилгээ</p>
          <h2>{slide.certificateTitle}</h2>
          <strong>{slide.certificateName}</strong>
          <span>{slide.certificateLine}</span>
        </div>
        {/* <div className="photo-strip">
          {slide.photoSlots.map((slot, index) => (
            <div
              className="photo-placeholder reveal"
              style={delay(index + 4)}
              key={slot}
            >
              <span />
              <p>{slot}</p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}

function ParentsSlide({ slide, isActive }) {
  return (
    <section
      className={slideClass("slide-parents", isActive)}
      aria-label={slide.title}
    >
      <div className="slide-inner split-grid">
        <div>
          <SlideHeader slide={slide} />
          <div className="parent-support-section mt-4">
            <h3
              className="section-subtitle reveal text-gold font-bold mb-3"
              style={delay(3)}
            ></h3>
            <div className="point-list">
              {slide.supportPoints.map((point, index) => (
                <div
                  className="point reveal"
                  style={delay(index + 4)}
                  key={point}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="parents-right-column">
          <div className="testimonials-list mt-4">
            <h3
              className="section-subtitle reveal text-cyan font-bold mb-3"
              style={delay(4)}
            ></h3>
            <div>
              {slide.testimonials.map((t, index) => (
                <div
                  key={index}
                  className="relative p-20 h-full rounded-xl bg-panel border border-line reveal overflow-hidden"
                  style={delay(index + 5)}
                >
                  <span className="absolute top-4 left-6 text-8xl text-gold/20 font-serif leading-none">
                    “
                  </span>

                  <p className="relative z-10 italic text-presentation-muted text-3xl leading-relaxed py-2 px-4">
                    {t.text}
                  </p>

                  <div className="relative z-10 mt-8 flex justify-end">
                    <span className="text-2xl text-gold font-semibold border-t border-gold/40 pt-3">
                      — {t.author}
                    </span>
                  </div>

                  <span className="absolute bottom-2 right-6 text-8xl text-gold/20 font-serif leading-none rotate-180">
                    “
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThanksSlide({ slide, isActive }) {
  return (
    <section
      className={slideClass("slide-thanks", isActive)}
      aria-label={slide.title}
    >
      <div className="slide-inner hero-grid">
        <div>
          <ConfettiFireworks>
            <SlideHeader slide={slide} />
          </ConfettiFireworks>
          <BadgeRow badges={slide.badges} />
        </div>
        <div className="celebration-visual">
          <div className="unlock-card reveal" style={delay(2)}>
            <span>Дараагийн түвшин</span>
            <strong>Нээгдлээ</strong>
          </div>
          <Terminal lines={slide.codeLines} />
        </div>
      </div>
    </section>
  );
}

function ComparePicture({ src, alt, placeholderTitle, placeholderText }) {
  const [hasError, setHasError] = useState(false);
  const isPlaceholder = !src || src.includes("placeholder") || hasError;

  return (
    <div className="compare-pic-container w-full!">
      <div className="screen-toolbar">
        <span />
        <span />
        <span />
      </div>
      <div className="compare-pic-content">
        {isPlaceholder ? (
          <div className="compare-pic-placeholder">
            <div className="compare-pic-icon-wrapper">
              <Icons.Image className="w-8 h-8 text-presentation-muted/60" />
            </div>
            <strong>{placeholderTitle || "Зураг оруулах"}</strong>
            <p>
              {placeholderText ||
                "Хичээлийн тоглоом, төслийн зургийг энд байрлуулна."}
            </p>
          </div>
        ) : (
          <Image
            src={src}
            alt={alt || "Төслийн зураг"}
            width={800}
            height={600}
            className="w-full h-full object-cover object-center"
            onError={() => setHasError(true)}
          />
        )}
      </div>
    </div>
  );
}

function Kami2Slide({ slide, isActive }) {
  return (
    <section
      className={slideClass("slide-kami2", isActive)}
      aria-label={slide.title}
    >
      <div className="slide-inner stack-grid">
        <SlideHeader slide={slide} />
        <div className="flex-wrap flex gap-4">
          {slide.badges.map((badge, index) => (
            <Badge key={badge} label={badge} index={index} />
          ))}
        </div>
        <div className="mt-6 flex gap-4 items-center">
          <div className="w-full">
            <ComparePicture
              src={slide.imageSrc}
              alt={slide.imageAlt}
              placeholderTitle={slide.placeholderTitle}
              placeholderText={slide.placeholderText}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CompareSlide({ slide, isActive }) {
  return (
    <section
      className={slideClass("slide-compare", isActive)}
      aria-label={slide.title}
    >
      <div className="slide-inner compare-stack-grid">
        <SlideHeader slide={slide} />

        <div className="compare-grid">
          {/* First Stage */}
          <div
            className="compare-card h-fit first-card reveal"
            style={delay(3)}
          >
            <h2 className="compare-title">
              <SmartIcon
                name={slide.first.icon || "Code"}
                className="w-5 h-5"
              />
              {slide.first.title}
            </h2>
            <div className="">
              <div
                className="compare-pic-wrapper reveal w-full!"
                style={delay(5)}
              >
                <ComparePicture
                  src={slide.first.imageSrc}
                  alt={slide.first.imageAlt}
                  placeholderTitle={slide.first.placeholderTitle}
                  placeholderText={slide.first.placeholderText}
                />
              </div>
            </div>
          </div>

          {/* Last Stage */}
          <div className="compare-card h-fit last-card reveal" style={delay(4)}>
            <h2 className="compare-title">
              <SmartIcon
                name={slide.last.icon || "Sparkles"}
                className="w-5 h-5"
              />
              {slide.last.title}
            </h2>
            <div className="">
              <div className="compare-pic-wrapper reveal " style={delay(6)}>
                <ComparePicture
                  src={slide.last.imageSrc}
                  alt={slide.last.imageAlt}
                  placeholderTitle={slide.last.placeholderTitle}
                  placeholderText={slide.last.placeholderText}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const renderers = {
  welcome: WelcomeSlide,
  about: AboutSlide,
  platform: PlatformSlide,
  learning: LearningSlide,
  topics: TopicsSlide,
  commands: CommandsSlide,
  skills: SkillsSlide,
  parents: ParentsSlide,
  achievement: AchievementSlide,
  kami2: Kami2Slide,
  thanks: ThanksSlide,
  compare: CompareSlide,
};

function Slide({ slide, isActive }) {
  const SlideComponent = renderers[slide.type];

  return <SlideComponent slide={slide} isActive={isActive} />;
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const total = slides.length;

  function goToSlide(index) {
    setCurrentSlide(Math.max(0, Math.min(index, total - 1)));
  }

  useEffect(() => {
    setCurrentSlide(getInitialSlide());
    setIsReady(true);
  }, []);

  useEffect(() => {
    function handleKeydown(event) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToSlide(currentSlide + 1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToSlide(currentSlide - 1);
      }
    }

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [currentSlide]);

  useEffect(() => {
    function handleHashChange() {
      const target = getInitialSlide();

      if (target !== currentSlide) {
        setCurrentSlide(target);
      }
    }

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [currentSlide]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    window.history.replaceState(null, "", `#${currentSlide + 1}`);

    if (window.matchMedia("(max-width: 900px)").matches) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentSlide, isReady]);

  return (
    <main id="app" aria-label="Kami Codebook Python төгсөлтийн танилцуулга">
      <div className="presentation-shell">
        <Logo />
        <div className="progress-track" aria-hidden="true">
          <span
            className="progress-fill"
            style={{ width: `${((currentSlide + 1) / total) * 100}%` }}
          />
        </div>
        <div className="slide-counter" aria-live="polite">
          {String(currentSlide + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </div>
        <button
          className="nav-button nav-prev"
          type="button"
          aria-label="Өмнөх слайд"
          disabled={currentSlide === 0}
          onClick={() => goToSlide(currentSlide - 1)}
        >
          ‹
        </button>
        <button
          className="nav-button nav-next"
          type="button"
          aria-label="Дараагийн слайд"
          disabled={currentSlide === total - 1}
          onClick={() => goToSlide(currentSlide + 1)}
        >
          ›
        </button>
        <div
          className="slide-track"
          style={{ transform: `translate3d(-${currentSlide * 100}vw, 0, 0)` }}
        >
          {slides.map((slide, index) => (
            <Slide
              key={`${slide.type}-${slide.title}`}
              slide={slide}
              isActive={index === currentSlide}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
