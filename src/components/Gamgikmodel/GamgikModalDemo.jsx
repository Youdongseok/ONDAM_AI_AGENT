import { useEffect, useRef, useState } from 'react';
import GamgikAgentOrbWithFace from './GamgikAgentOrbWithFace.jsx';

export default function GamgikModalDemo({ themeMode = 'light' }) {
  const expressionStartTimerRef = useRef(null);
  const expressionReactionTimerRef = useRef(null);
  const expressionTimerRef = useRef(null);
  const [expressionOverride, setExpressionOverride] = useState(null);

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
    <section className="flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center gap-8 overflow-hidden">
      <div className="relative h-[460px] w-[460px] shrink-0 overflow-visible">
        <GamgikAgentOrbWithFace
          size={460}
          speed={10}
          motion={0.78}
          statusKey="normal"
          themeMode={themeMode}
          expressionOverride={expressionOverride}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => showExpression('happy')}
          className={expressionButtonClassName}
        >
          ^^ 웃는 표정
        </button>

        <button
          type="button"
          onClick={() => showExpression('angry')}
          className={expressionButtonClassName}
        >
          \ / 화난 표정
        </button>

        <button
          type="button"
          onClick={() => showExpression('crying')}
          className={expressionButtonClassName}
        >
          ㅠ ㅠ 우는 표정
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
      </div>
    </section>
  );
}
