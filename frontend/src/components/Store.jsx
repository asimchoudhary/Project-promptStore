import { Archive } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
function Store() {
  return (
    <div className="mt-2">
      <div className="text-center mt-10 font-sans text-xl font-medium flex items-center justify-center">
        <Archive className="h-6 w-6 mr-2" />
        Collections
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
export default Store;
