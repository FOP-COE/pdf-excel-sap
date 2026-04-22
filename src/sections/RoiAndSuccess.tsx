import { SectionShell } from '@/components/common/SectionShell';
import { RoiCalculator } from '@/components/interactive/RoiCalculator';
import { SuccessStories } from '@/components/common/SuccessStories';
import { AdoptionCurveChart } from '@/components/interactive/AdoptionCurveChart';
import { SectionProps } from '@/types';
import { successStories as defaultStories } from '@/data';
import { usePresentation } from '@/context/PresentationContext';

export const RoiAndSuccess = ({ resetSignal, isPaused }: SectionProps) => {
  const { customData } = usePresentation();
  const stories = customData?.successStories?.length ? customData.successStories : defaultStories;
  const roiDefaults = customData?.roiDefaults;

  return (
    <SectionShell
      title="ROI Calculator & Success Stories"
      subtitle="Cuantifica el impacto y mira ejemplos concretos de organizaciones similares."
      durationMinutes={10}
    >
      <RoiCalculator
        resetSignal={resetSignal}
        defaults={roiDefaults ?? { approvalsPerWeek: 28, minutesPerApproval: 22, hourlyRate: 52 }}
      />
      <SuccessStories stories={stories} />
      <AdoptionCurveChart isPaused={isPaused} />
    </SectionShell>
  );
};
