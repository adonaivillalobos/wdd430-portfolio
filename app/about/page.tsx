import SkillCard from '@/components/SkillCard';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">About Me</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        I&apos;m Adonai Villalobos, an Account Manager working in SaaS who is transitioning into web development.
        I&apos;m currently studying web development at BYU-Idaho, building projects like this one to learn
        Next.js, React, and TypeScript along the way.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-8">
        Outside of work and school, I enjoy following long-running anime series and exploring
        content creation tools.
      </p>

      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Skills</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <SkillCard name="Next.js" level="Learning" />
        <SkillCard name="React" level="Learning" />
        <SkillCard name="TypeScript" level="Learning" />
        <SkillCard name="Excel / VBA" level="Confident" />
        <SkillCard name="Salesforce" level="Confident" />
        <SkillCard name="HTML / CSS" level="Comfortable" />
      </div>
    </div>
  );
}