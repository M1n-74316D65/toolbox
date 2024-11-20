import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import ImageCropper from "./ImageCropper"

export default function TabsContainer() {
  return (
    <Tabs defaultValue="image-cropper" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="image-cropper">Image Cropper</TabsTrigger>
        <TabsTrigger value="coming-soon">Coming Soon</TabsTrigger>
      </TabsList>
      <TabsContent value="image-cropper" className="border rounded-lg p-4">
        <ImageCropper />
      </TabsContent>
      <TabsContent value="coming-soon" className="border rounded-lg p-8">
        <div className="flex flex-col items-center justify-center space-y-4 min-h-[200px]">
          <p className="text-lg font-medium text-muted-foreground">More features coming soon!</p>
          <p className="text-sm text-muted-foreground">Check back later for updates.</p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
