import { Seo } from '@/components/Seo';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Badge } from '@/components/ui/Badge';
import { resumeData } from '@/data/resume';

const focusAreas = [
  'Cloud Infrastructure',
  'Identity & Access',
  'Networking',
  'Security Operations',
  'Automation',
];

const currentlyLearning = [
  'Infrastructure as Code with Bicep',
  'Detection engineering with KQL and Sentinel',
  'Danish — still in progress',
];

export function About() {
  return (
    <>
      <Seo
        title="About"
        description="How Dodzi Kwasi Nuhoho went from configuring switches in Ghana to building governed Azure environments and automating incident response in Denmark."
        path="/about"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
        <Eyebrow>cat about.md</Eyebrow>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-text)]">About</h1>

        <section className="mt-10 space-y-5 text-base leading-relaxed text-[var(--color-text-muted)]">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Introduction</h2>
          <p>
            I&rsquo;m an infrastructure and cloud engineer based in Hiller&oslash;d, Denmark. I studied
            telecommunication engineering at KNUST in Kumasi &mdash; a degree that teaches you to think
            in links and failure modes before it teaches you anything about software &mdash; and then
            took an MSc in Communication Technologies &amp; System Design at DTU, specialising in cloud
            and cybersecurity.
          </p>
          <p>
            My first real job was at the Volta River Authority, configuring L2 and L3 switches, routers,
            and firewalls. On the same days, I was walking people through why their laptop wouldn&rsquo;t
            join the domain. Those two halves turned out to matter equally: network design taught me how
            systems are supposed to behave, and the service desk taught me how they actually behave, and
            that behind every ticket is a person who has already lost twenty minutes.
          </p>
          <p>
            Denmark moved that work upward &mdash; Azure governance and identity instead of switch ports,
            Sentinel and KQL alongside Wireshark rather than instead of it. My thesis was written with the
            cyber defence centre at TDC NET, on converting incident-response playbooks into a
            machine-readable format that operators could actually share with each other. The technical
            half was straightforward. Trust was the hard half.
          </p>
          <p>
            I&rsquo;m currently working part-time at Thiim A/S on embedded monitoring equipment, and
            looking for a full-time role in cloud, infrastructure, or security operations.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Education</h2>
          <div className="mt-4 space-y-3">
            {resumeData.education.map((entry) => (
              <div
                key={entry.institution}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
              >
                <p className="font-mono text-sm text-[var(--color-text)]">{entry.credential}</p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {entry.institution} &middot; {entry.period}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Technical Interests</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <Badge key={area} variant="accent">
                {area}
              </Badge>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Currently Learning</h2>
          <ul className="mt-4 space-y-2">
            {currentlyLearning.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 font-mono text-sm text-[var(--color-text)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 space-y-5 text-base leading-relaxed text-[var(--color-text-muted)]">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Career Direction</h2>
          <p>
            I&rsquo;m looking for a full-time role in Denmark as a cloud, infrastructure, or security
            operations engineer &mdash; somewhere I can keep working across Azure, identity, and
            networking rather than narrowing to exactly one of them. I&rsquo;m equally happy building the
            environment and being the person who gets paged about it, and I&rsquo;d rather join a team
            where I&rsquo;m the least experienced person in the room than one where nobody can review my
            work.
          </p>
        </section>

        <section className="mt-10 space-y-5 text-base leading-relaxed text-[var(--color-text-muted)]">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">How I Work</h2>
          <p>
            <span className="text-[var(--color-text)]">Measure before changing anything.</span> Every time
            I&rsquo;ve guessed where a bottleneck or a misconfiguration was, I&rsquo;ve been wrong.
            Instrumentation is cheap compared to the time lost fixing the wrong thing &mdash; the Azure
            Policy write-up on this site is basically a story about that.
          </p>
          <p>
            <span className="text-[var(--color-text)]">Documentation is part of the build.</span> A
            control nobody can explain gets removed by the next person under deadline pressure. My thesis
            was six months of arguing that a process only really exists once it&rsquo;s written down in a
            form something else can act on.
          </p>
          <p>
            <span className="text-[var(--color-text)]">Security has to survive contact with users.</span>{' '}
            Controls that are too painful get routed around, and then you have a policy that is true on
            paper and false in production. The service desk years made that obvious in a way no course
            did.
          </p>
        </section>
      </div>
    </>
  );
}
