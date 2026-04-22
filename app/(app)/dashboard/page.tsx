import { SellerDashboard } from "@/components/SellerDashboard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your listings and track performance
          </p>
        </div>
        <Link href="/listings/new">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Listing
          </Button>
        </Link>
      </div>
      <SellerDashboard />
    </div>
  );
}
