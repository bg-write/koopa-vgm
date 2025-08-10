import Link from 'next/link';

export default function Footer() {
  return (
    <div className="mt-8 md:mt-12 text-center">
      <p className="text-sm text-gray-600 mb-4">
        Built with Next.js, Tailwind, and Cursor. Data pulled from Spotify, YouTube, and RAWG APIs via Python. All images respectfully taken from Wikipedia. This app was made by Brady Gerber (me). Thank you, Sam and Emily, for the initial feedback. Video game music rules. Check out Koopa&apos;s <a href="https://github.com/bg-write/koopa-vgm" target="_blank" rel="noopener noreferrer" className="text-koopa-green hover:text-koopa-green-dark underline">GitHub</a>.
      </p>
      <div className="flex justify-center space-x-2 text-sm">
        <Link href="/" className="text-koopa-green hover:text-koopa-green-dark underline">Home</Link>
        <span className="text-gray-400">|</span>
        <Link href="/how-i-made-koopa" className="text-koopa-green hover:text-koopa-green-dark underline">How I Made Koopa</Link>
      </div>
    </div>
  );
}
