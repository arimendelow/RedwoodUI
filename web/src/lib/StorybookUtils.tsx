export const ChildrenPlaceholder = () => (
  <div className="relative h-full w-full overflow-hidden border border-dashed border-neutral-400 opacity-75">
    <svg
      className="absolute inset-0 h-full w-full stroke-neutral-900/10 dark:stroke-neutral-50/20"
      fill="none"
    >
      <defs>
        <pattern
          id="pattern-87beeb02-b726-4cd1-be69-ae5bc27986e9"
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
        </pattern>
      </defs>
      <rect
        stroke="none"
        fill="url(#pattern-87beeb02-b726-4cd1-be69-ae5bc27986e9)"
        width="100%"
        height="100%"
      ></rect>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-xl font-semibold text-neutral-900 dark:text-neutral-300">
        your content goes here
      </div>
    </div>
  </div>
)
