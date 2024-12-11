import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function PromptRender() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Question 1</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>What is the capital of France?</CardDescription>
      </CardContent>
      <CardFooter>
        <input type="text" />
      </CardFooter>
    </Card>
  );
}
export default PromptRender;
