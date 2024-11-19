import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import ImageCropper from "./ImageCropper"

export default function TabsContainer() {
  return (
    <Tabs defaultValue="image-cropper" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="image-cropper">Image Cropper</TabsTrigger>
        <TabsTrigger value="coming-soon">Coming Soon</TabsTrigger>
      </TabsList>
      <TabsContent value="image-cropper">
        <ImageCropper />
      </TabsContent>
      <TabsContent value="coming-soon">
        <div className="flex items-center justify-center p-8 text-muted-foreground">
          More features coming soon!
        </div>
      </TabsContent>
    </Tabs>
  )
}
