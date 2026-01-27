import type { ReactNode } from "react";
import { Protected } from "@/ui/organisms";

const ManagementCenterLayout = ({ children }: Readonly<{ children: ReactNode }>) => <Protected>{children}</Protected>;

export default ManagementCenterLayout;
