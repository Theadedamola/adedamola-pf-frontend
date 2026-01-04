import { useMutation } from '@tanstack/react-query';
import { mediaService } from '../../services/api/mediaService';

export const useUploadMedia = () => {
  return useMutation({
    mutationFn: mediaService.uploadMedia,
  });
};

export const useDeleteMedia = () => {
  return useMutation({
    mutationFn: mediaService.deleteMedia,
  });
};
