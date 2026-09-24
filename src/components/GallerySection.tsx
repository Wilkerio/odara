import { motion } from "framer-motion";
import gallerySpeaker from "@/assets/gallery-image-6.png.asset.json";
import galleryMeeting from "@/assets/gallery-image-7.png.asset.json";
import galleryHandshake from "@/assets/gallery-image-8.png.asset.json";

const photos = [
  { src: gallerySpeaker.url, captionKey: "c1", aspectRatio: "1024 / 683", offset: false },
  { src: galleryMeeting.url, captionKey: "c2", aspectRatio: "1024 / 683", offset: true },
  { src: galleryHandshake.url, captionKey: "c3", aspectRatio: "683 / 1024", offset: false },
];

const L: Record<string, any> = {
  en: { k: "Gallery", t: "Moments that define us", s: "A glimpse of our presence across forums, meetings and agreements.", c1: "Global forums & keynotes", c2: "Business meetings", c3: "Agreements in motion" },
  pt: { k: "Galeria", t: "Momentos que nos definem", s: "Um olhar sobre a nossa presença em fóruns, reuniões e acordos.", c1: "Fóruns globais & palestras", c2: "Reuniões de negócios", c3: "Acordos em movimento" },
  fr: { k: "Galerie", t: "Des moments qui nous définissent", s: "Un aperçu de notre présence dans les forums, réunions et accords.", c1: "Forums mondiaux & conférences", c2: "Réunions d'affaires", c3: "Accords en marche" },
  es: { k: "Galería", t: "Momentos que nos definen", s: "Un vistazo a nuestra presencia en foros, reuniones y acuerdos.", c1: "Foros globales & conferencias", c2: "Reuniones de negocios", c3: "Acuerdos en marcha" },
};

const GallerySection = ({ lang = "en" }: { lang?: string }) => {
  const l = L[lang] || L.en;
  return (
    <section
      id="gallery"
      className="border-t py-20 md:py-28"
      style={{ borderColor: "rgba(13,13,13,0.1)", background: "hsl(var(--background))" }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 max-w-3xl md:mb-16">
          <p className="mb-5 flex items-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-primary">
            <span className="h-px w-10 flex-shrink-0 bg-primary" />
            {l.k}
          </p>
          <h2 className="font-['Cormorant_Garamond',serif] text-4xl font-light leading-tight md:text-6xl">
            {l.t}
          </h2>
          <p className="mt-5 text-sm font-light text-muted-foreground md:text-base">
            {l.s}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {photos.map((photo, index) => (
            <motion.figure
              key={photo.captionKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              className={`group relative overflow-hidden ${photo.offset ? "md:mt-14" : ""}`}
            >
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: photo.aspectRatio }}
              >
                <img
                  src={photo.src}
                  alt={l[photo.captionKey]}
                  loading="lazy"
                  className="h-full w-full object-contain object-center transition-transform duration-[1.4s] ease-out group-hover:scale-[1.02]"
                />
                <div
                  className="absolute inset-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"
                  style={{ background: "#3B006F" }}
                />
              </div>

              <figcaption className="flex items-baseline gap-4 pt-5">
                <span className="font-['Cormorant_Garamond',serif] text-xl font-light text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground/80">
                  {l[photo.captionKey]}
                </span>
                <span className="h-px flex-1 bg-border transition-colors duration-500 group-hover:bg-primary" />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
