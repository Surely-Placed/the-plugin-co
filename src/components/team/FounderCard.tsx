import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";
import type { Founder } from "../../lib/team";
import { SiteImage } from "../ui/SiteImage";
interface FounderCardProps {
  founder: Founder;
  index: number;
}

export function FounderCard({ founder }: FounderCardProps) {
  const initials = founder.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
      <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-glass-lg">
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-accent/20 via-bg-secondary to-accent-light/20">
          {founder.image ? (
            <SiteImage
              src={founder.image}
              alt={`Portrait of ${founder.name}, ${founder.role}`}
              width={400}
              height={500}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-mono text-8xl text-accent/30">{initials}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-60" />
          <div className="glass absolute bottom-4 left-4 right-4 rounded-xl p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <p className="text-xs text-muted">Current focus</p>
            <p className="text-sm font-medium text-white">{founder.currentMission}</p>
          </div>
        </div>

        <div className="p-8">
          <h3 className="heading-card text-3xl not-italic">{founder.name}</h3>
          <p className="label-xs mt-2 text-accent">{founder.role}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{founder.bio}</p>

          <div className="mt-6">
            <p className="label-xs mb-3">Areas of Expertise</p>
            <div className="flex flex-wrap gap-2">
              {founder.focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-white/10 bg-black px-3 py-1 text-xs text-white"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            {founder.linkedin && (
              <motion.a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-accent hover:text-accent"
                aria-label={`${founder.name} on LinkedIn`}
              >
                <Linkedin size={18} />
              </motion.a>
            )}
            {founder.twitter && (
              <motion.a
                href={founder.twitter}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-accent hover:text-accent"
                aria-label={`${founder.name} on X`}
              >
                <Twitter size={18} />
              </motion.a>
            )}
          </div>
        </div>
      </article>
  );
}
