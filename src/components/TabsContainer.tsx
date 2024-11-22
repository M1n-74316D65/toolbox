import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import ImageCropper from "./ImageCropper";
import MarkdownToPdf from "./MarkdownToPdf";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TabsContainer() {
  return (
    <Card>
      <Tabs defaultValue="image-cropper" className="w-full">
        <CardHeader>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="image-cropper">Image Cropper</TabsTrigger>
            <TabsTrigger value="markdown-pdf">Markdown to PDF</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="pb-8">
          <TabsContent value="image-cropper">
            <ImageCropper />
          </TabsContent>
          <TabsContent value="markdown-pdf">
            <MarkdownToPdf />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
