"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Lexend } from 'next/font/google'
import Link from "next/link"
import Image from 'next/image'
import { usePathname } from "next/navigation"
import { LayoutTemplate, Box } from "lucide-react"
import VersionTag from "./version-tag"

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400'],
})

const data = {
  navMain: [
    { title: 'Templates', url: '/templates', icon: LayoutTemplate },
    { title: 'Resources', url: '/resources', icon: Box },
  ],
}

export function AppSidebar() {
  const pathname = usePathname()
  console.log('pathname:', pathname)

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href='/'>
                <div className='flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg'>
                  <Image src='/tarmo.png' alt='' width={34} height={34} />
                </div>
                <span className={`text-4xl font-bold truncate group-data-[collapsible=icon]:hidden ${lexend.className}`}>
                  TARMO
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.url
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link href={item.url} className='font-medium'>
                      <Icon className='size-5' /> {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <VersionTag/>
      </SidebarFooter>
    </Sidebar>
  )
}