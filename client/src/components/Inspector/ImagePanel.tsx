import { useState } from 'react';
import { useEditorStore } from '@/stores/editorStore';
import { MediaFile, Clip } from '@/types/editor';
import { IMAGE_DEFAULT_DURATION } from '../../config/media';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image, Clock, Move3D, RotateCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImagePanelProps {
  clip: Clip;
  media: MediaFile;
}

export default function ImagePanel({ clip, media }: ImagePanelProps) {
  const { updateClip } = useEditorStore();
  const { toast } = useToast();
  
  const [duration, setDuration] = useState(clip.endTime - clip.startTime);
  const [opacity, setOpacity] = useState([clip.opacity * 100]);
  const [scaleX, setScaleX] = useState([clip.transform.scaleX * 100]);
  const [scaleY, setScaleY] = useState([clip.transform.scaleY * 100]);
  const [rotation, setRotation] = useState([clip.transform.rotation]);

  const handleDurationChange = (newDuration: number) => {
    if (newDuration <= 0) return;
    
    setDuration(newDuration);
    updateClip(clip.id, {
      endTime: clip.startTime + newDuration,
      sourceEndTime: newDuration
    });
    
    toast({
      title: "Duration Updated",
      description: `Image duration set to ${newDuration.toFixed(1)}s`
    });
  };

  const handleOpacityChange = (value: number[]) => {
    setOpacity(value);
    updateClip(clip.id, {
      opacity: value[0] / 100
    });
  };

  const handleScaleXChange = (value: number[]) => {
    setScaleX(value);
    updateClip(clip.id, {
      transform: {
        ...clip.transform,
        scaleX: value[0] / 100
      }
    });
  };

  const handleScaleYChange = (value: number[]) => {
    setScaleY(value);
    updateClip(clip.id, {
      transform: {
        ...clip.transform,
        scaleY: value[0] / 100
      }
    });
  };

  const handleRotationChange = (value: number[]) => {
    setRotation(value);
    updateClip(clip.id, {
      transform: {
        ...clip.transform,
        rotation: value[0]
      }
    });
  };

  const resetToDefaults = () => {
    const defaultDuration = IMAGE_DEFAULT_DURATION;
    setDuration(defaultDuration);
    setOpacity([100]);
    setScaleX([100]);
    setScaleY([100]);
    setRotation([0]);

    updateClip(clip.id, {
      endTime: clip.startTime + defaultDuration,
      sourceEndTime: defaultDuration,
      opacity: 1,
      transform: {
        ...clip.transform,
        scaleX: 1,
        scaleY: 1,
        rotation: 0
      }
    });

    toast({
      title: "Reset Complete",
      description: "Image properties reset to defaults"
    });
  };

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <Image className="w-5 h-5" />
          Image Properties
        </CardTitle>
        <p className="text-sm text-slate-400">{media.name}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Duration Control */}
        <div className="space-y-2">
          <Label className="text-sm text-white flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Duration (seconds)
          </Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="0.1"
              max="300"
              step="0.1"
              value={duration.toFixed(1)}
              onChange={(e) => handleDurationChange(parseFloat(e.target.value))}
              className="bg-white/5 border-white/10 text-white"
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleDurationChange(IMAGE_DEFAULT_DURATION)}
              className="text-white hover:text-white hover:bg-white/20"
            >
              Reset
            </Button>
          </div>
          <p className="text-xs text-slate-500">
            Default: {IMAGE_DEFAULT_DURATION}s
          </p>
        </div>

        {/* Opacity Control */}
        <div className="space-y-2">
          <Label className="text-sm text-white">
            Opacity: {opacity[0]}%
          </Label>
          <Slider
            value={opacity}
            onValueChange={handleOpacityChange}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Scale Controls */}
        <div className="space-y-3">
          <Label className="text-sm text-white flex items-center gap-2">
            <Move3D className="w-4 h-4" />
            Scale
          </Label>
          
          <div className="space-y-2">
            <Label className="text-xs text-slate-400">
              Width: {scaleX[0]}%
            </Label>
            <Slider
              value={scaleX}
              onValueChange={handleScaleXChange}
              min={10}
              max={300}
              step={1}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs text-slate-400">
              Height: {scaleY[0]}%
            </Label>
            <Slider
              value={scaleY}
              onValueChange={handleScaleYChange}
              min={10}
              max={300}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Rotation Control */}
        <div className="space-y-2">
          <Label className="text-sm text-white flex items-center gap-2">
            <RotateCw className="w-4 h-4" />
            Rotation: {rotation[0]}°
          </Label>
          <Slider
            value={rotation}
            onValueChange={handleRotationChange}
            min={-180}
            max={180}
            step={1}
            className="w-full"
          />
        </div>

        {/* Image Info */}
        <div className="pt-2 border-t border-white/10">
          <div className="text-xs text-slate-400 space-y-1">
            <div>Resolution: {media.width}×{media.height}</div>
            <div>Size: {(media.size / 1024 / 1024).toFixed(2)} MB</div>
            <div>Type: {media.type}</div>
          </div>
        </div>

        {/* Reset Button */}
        <Button
          onClick={resetToDefaults}
          variant="outline"
          className="w-full border-white/20 text-white hover:text-white hover:bg-white/20"
        >
          Reset All Properties
        </Button>
      </CardContent>
    </Card>
  );
}