import { ProfileMenu } from "@/components";

export default function Settings() {
  return (
    <div className="h-screen flex flex-row gap-2 flex-nowrap items-start justify-end pt-[4rem]">
      <ProfileMenu />
      <div className="w-9/12 px-3">Settings</div>
    </div>
  );
}
