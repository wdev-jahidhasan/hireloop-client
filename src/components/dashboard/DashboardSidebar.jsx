import React from "react";
import Link from "next/link";
import { 
  Home, 
  Briefcase, 
  PlusCircle, 
  Mail, 
  User, 
  Settings, 
  PanelLeft, 
  BriefcaseBusiness
} from "lucide-react";
import { Button, Drawer } from "@heroui/react";

export function DashboardSidebar() {
  const navItems = [
    { icon: Home, href: "/dashboard/recruiter", label: "Home" },
    { icon: Briefcase, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    { icon: PlusCircle, href: "/dashboard/recruiter/jobs/new", label: "Post A Job" },
    { icon: BriefcaseBusiness, href: "/dashboard/recruiter/company", label: "Company Profile" },
    { icon: Mail, href: "/dashboard/recruiter/messages", label: "Messages" },
    { icon: User, href: "/dashboard/recruiter/profile", label: "Profile" },
    { icon: Settings, href: "/dashboard/recruiter/settings", label: "Settings" },
  ];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          >
            <IconComponent className="size-5 text-muted" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>

      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <PanelLeft className="size-5" />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}