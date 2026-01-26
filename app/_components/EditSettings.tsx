"use client";

import { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateUserData } from "@/src/lib/actions/update-user";
import Image from "next/image";

type Props = {
  user: {
    name: string | null;
    email: string | null;
    image: string | null | undefined;
  };
};

const EditSettings = ({ user }: Props) => {
  const router = useRouter();
  const [state, action, isPending] = useActionState(updateUserData, null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
  };

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);
      window.location.reload();
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="p-24 flex justify-center">
      <form action={action} className="w-full max-w-lg">
        <Card className="rounded-2xl border border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Paramètres du compte
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-10">
            {/* NOM */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Nom actuel :{" "}
                <span className="font-medium">{user.name || "Non défini"}</span>
              </p>
              <Label htmlFor="name">Nouveau nom</Label>
              <Input id="name" name="name" placeholder="Votre nouveau nom" />
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Email actuel : <span className="font-medium">{user.email}</span>
              </p>
              <Label htmlFor="email">Nouvel email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nouvel@email.com"
              />
            </div>

            {/* IMAGE */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-primary/10">
                  <Image
                    width={24}
                    height={24}
                    src={user.image || "/user.svg"}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="image" className="mb-2 ml-1">
                    Nouvelle Photo de profil
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending
                ? "Enregistrement..."
                : "Enregistrer les modifications"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default EditSettings;
