import { useEffect, useRef, useState } from 'react';
import GamgikAgentOrbWithFace from './GamgikAgentOrbWithFace.jsx';
import GlassPagination from './GlassPagination.jsx';

export default function GamgikModalDemo({ themeMode = 'light' }) {
  const expressionStartTimerRef = useRef(null);
  const expressionReactionTimerRef = useRef(null);
  const expressionTimerRef = useRef(null);
  const [expressionOverride, setExpressionOverride] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    return () => {
      if (expressionStartTimerRef.current) window.clearTimeout(expressionStartTimerRef.current);
      if (expressionReactionTimerRef.current) {
        window.clearTimeout(expressionReactionTimerRef.current);
      }
      if (expressionTimerRef.current) window.clearTimeout(expressionTimerRef.current);
    };
  }, []);

  function showExpression(expression, duration = 900) {
    if (expressionStartTimerRef.current) window.clearTimeout(expressionStartTimerRef.current);
    if (expressionReactionTimerRef.current) window.clearTimeout(expressionReactionTimerRef.current);
    if (expressionTimerRef.current) window.clearTimeout(expressionTimerRef.current);

    setExpressionOverride(expression);

    expressionStartTimerRef.current = window.setTimeout(() => {
      setExpressionOverride('blink');

      expressionTimerRef.current = window.setTimeout(() => {
        setExpressionOverride(null);
      }, 120);
    }, duration);
  }

  function showSleepyExpression() {
    if (expressionStartTimerRef.current) window.clearTimeout(expressionStartTimerRef.current);
    if (expressionReactionTimerRef.current) window.clearTimeout(expressionReactionTimerRef.current);
    if (expressionTimerRef.current) window.clearTimeout(expressionTimerRef.current);

    setExpressionOverride('sleepy');

    expressionReactionTimerRef.current = window.setTimeout(() => {
      setExpressionOverride('surprised');

      expressionStartTimerRef.current = window.setTimeout(() => {
        setExpressionOverride('blink');

        expressionTimerRef.current = window.setTimeout(() => {
          setExpressionOverride(null);
        }, 120);
      }, 620);
    }, 1760);
  }

  const expressionButtonClassName = `rounded-md border px-5 py-2.5 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${
    themeMode === 'dark'
      ? 'border-white/15 bg-white/8 text-blue-50 hover:border-white/30 hover:bg-white/14'
      : 'border-blue-100 bg-blue-50/80 text-blue-700 hover:border-blue-200 hover:bg-blue-100'
  }`;

  return (
    <section className="flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center gap-6 overflow-hidden">
      <img
        src="/logo.png"
        alt="ONDAM"
        className="h-auto w-[280px] max-w-[72vw] object-contain sm:w-[320px]"
      />

      <div className="relative h-[460px] w-[460px] shrink-0 overflow-visible">
        <GamgikAgentOrbWithFace
          size={460}
          speed={10}
          motion={0.78}
          statusKey="normal"
          themeMode={themeMode}
          isLoading={isLoading}
          expressionOverride={expressionOverride}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => showExpression('happy')}
          className={expressionButtonClassName}
        >
          웃는 표정
        </button>

        <button
          type="button"
          onClick={() => showExpression('angry')}
          className={expressionButtonClassName}
        >
          화난 표정
        </button>

        <button
          type="button"
          onClick={() => showExpression('crying')}
          className={expressionButtonClassName}
        >
          우는 표정
        </button>

        <button type="button" onClick={showSleepyExpression} className={expressionButtonClassName}>
          졸린 표정
        </button>

        <button
          type="button"
          onClick={() => showExpression('searching', 1800)}
          className={expressionButtonClassName}
        >
          검색중
        </button>

        {/* <button
          type="button"
          aria-pressed={isLoading}
          onClick={() => setIsLoading(current => !current)}
          className={expressionButtonClassName}
        >
          {isLoading ? '로딩 종료' : '로딩'}
        </button> */}
      </div>

      {/* <div className="w-full max-w-[520px]">
        <GlassPagination
          currentPage={currentPage}
          totalPages={12}
          onPageChange={setCurrentPage}
          themeMode={themeMode}
        />
      </div> */}
    </section>
  );
}
