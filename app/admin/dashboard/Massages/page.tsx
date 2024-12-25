import prisma from "@/app/utils/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";

const fetchMassages = async () => {
  const response = await prisma.contactMessage.findMany({
    select: {
      name: true,
      email: true,
      message: true,
      createdAt: true,
    },
  });
  return response;
};

export default function AdminDashboardContact() {
  const { data: Massage, error } = useSWR('contactMessages', fetchMassages);

  if (error) {
    return <div>Error loading messages.</div>;
  }

  if (!Massage) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1 className="text-2xl font-bold">All Messages</h1>
      {Massage.length === 0 ? (
        <div>No Messages found</div>
      ) : (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>All Messages</CardTitle>
              <CardDescription>Manage all Messages from this dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Massage.map((Massage : any) => (
                    <TableRow key={Massage.id}>
                      <TableCell className="text-left">{Massage.name}</TableCell>
                      <TableCell className="text-left">{Massage.email}</TableCell>
                      <TableCell className="text-left">{Massage.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
