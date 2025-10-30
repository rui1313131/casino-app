import { z } from 'zod';

export const CreateRoomSchema = z.object({
  roomName: z.string()
    .min(3, { message: "Room name must be at least 3 characters." })
    .max(50, { message: "Room name must be 50 characters or less." })
    .regex(/^[a-zA-Z0-9\s\-_'"]+$/, { message: "Room name contains invalid characters." })
    .trim()
});

function handleCreateRoom(formData: FormData) {
  const roomName = formData.get('roomName');
  const validationResult = CreateRoomSchema.safeParse({ roomName });

  if (!validationResult.success) {
    console.error("Validation error:", validationResult.error.flatten().fieldErrors);
    return;
  }
  
  const validatedRoomName = validationResult.data.roomName;
  console.log("Validated Room Name:", validatedRoomName);
  // ... proceed to call API
}
