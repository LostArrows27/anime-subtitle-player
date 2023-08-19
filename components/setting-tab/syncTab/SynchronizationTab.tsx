import AutoSynSetting from "./AutoSyncSetting";
import HandSyncSetting from "./HandSyncSetting";

export type SynchronizationTabProps = {
  setSubtitleSyncDiffAdd: React.Dispatch<React.SetStateAction<number>>;
};

function SynchronizationTab({
  setSubtitleSyncDiffAdd,
}: SynchronizationTabProps) {
  return (
    <div className="w-full h-full mt-5">
      <HandSyncSetting setSubtitleSyncDiffAdd={setSubtitleSyncDiffAdd} />
      <AutoSynSetting />
    </div>
  );
}

export default SynchronizationTab;
