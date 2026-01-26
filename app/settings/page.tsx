"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bookmark,
  LayoutDashboard,
  LogOut,
  Presentation,
  Settings,
  ShieldUser,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { SignoutPrompt } from "@/src/components/signout-prompt";
import { useSession } from "@/src/lib/auth-client";
import EditSettings from "../_components/EditSettings";
import Image from "next/image";

export default function SettingsPage() {
  const { data: session, isPending } = useSession();
  const [showPrompt, setShowPrompt] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const dashboard = () => router.push("/dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      <header className=" px-6 py-4 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="absolute top-6 right-8">
            <Button className="flex flex-row items-center gap-2 p-2 bg-white text-black border border-black/20 hover:bg-white/80 cursor-pointer">
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={session.user.image ?? "/user.svg"}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="font-semibold">{session?.user.name}</h2>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-semibold text-sm">
              Mon Compte
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={dashboard}>
              <LayoutDashboard /> Dashboard
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {session?.user?.role === "admin" && (
              <DropdownMenuItem className="cursor-pointer">
                <ShieldUser /> Gestion Utilisateurs
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            {session?.user?.role === "admin" && (
              <DropdownMenuItem className="cursor-pointer">
                <Presentation /> Creer un parcours
              </DropdownMenuItem>
            )}
            {session?.user?.role === "admin" && (
              <DropdownMenuItem className="cursor-pointer">
                <Bookmark /> Creer une lesson
              </DropdownMenuItem>
            )}
            {session?.user?.role === "admin" && (
              <DropdownMenuItem className="cursor-pointer">
                <Star /> Creer un quizz
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Presentation /> Parcours
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Bookmark /> Lessons
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Star /> Quizz
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer bg-gray-200">
              <Settings /> Paramètres
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 font-semibold flex items-center gap-2 cursor-pointer"
              onClick={() => setShowPrompt(true)}
            >
              <LogOut className="text-red-500" />
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main>
        <EditSettings
          user={{
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
          }}
        />
      </main>

      {showPrompt && <SignoutPrompt onCancel={() => setShowPrompt(false)} />}
    </div>
  );
}
