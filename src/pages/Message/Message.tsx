  // import  { useState } from 'react';
  // import { Input } from '@/components/ui/input';
  // import { Button } from '@/components/ui/button';
  // import { Card, CardContent } from '@/components/ui/card';
  // import { ScrollArea } from '@/components/ui/scroll-area';
  // import { cn } from '@/lib/utils';

  // const mockMessages = [
  //   {
  //     id: 1,
  //     name: 'Trần Ngọc Phương',
  //     email: 'ngocphuong@example.com',
  //     subject: 'Quy trình lắp đặt hệ thống pin...',
  //     content: `Kính gửi: Cô Vân Phạm Văn An\n\nTôi là Trần Bảo Anh Huy, hiện đang có một vài thắc mắc liên quan đến hệ thống pin năng lượng mặt trời...`,
  //     date: '07/02/2025 21:08',
  //     avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
  //   },
  //   // Add more mock messages here
  // ];

  // export default function Message() {
  //   const [selectedId, setSelectedId] = useState<number | null>(mockMessages[0].id);
  //   const selectedMsg = mockMessages.find((msg) => msg.id === selectedId);

  //   return (
  //     <div className="grid grid-cols-[300px_1fr] h-screen bg-gray-50">
  //       <aside className="border-r bg-white p-4">
  //         <div className="mb-4 flex justify-between items-center">
  //           <Button className="rounded-xl bg-orange-500 hover:bg-orange-600">Thư mới</Button>
  //           <Input placeholder="Tìm kiếm" className="ml-2" />
  //         </div>
  //         <ScrollArea className="h-[calc(100vh-100px)] pr-2">
  //           {mockMessages.map((msg) => (
  //             <Card
  //               key={msg.id}
  //               onClick={() => setSelectedId(msg.id)}
  //               className={cn(
  //                 'mb-2 cursor-pointer rounded-xl transition-all border hover:shadow-md',
  //                 selectedId === msg.id ? 'border-orange-500 bg-orange-50' : ''
  //               )}
  //             >
  //               <CardContent className="flex gap-3 p-3">
  //                 <img src={msg.avatar} alt={msg.name} className="w-10 h-10 rounded-full object-cover" />
  //                 <div>
  //                   <p className="font-medium text-sm">{msg.name}</p>
  //                   <p className="text-xs text-gray-500 truncate max-w-[200px]">{msg.subject}</p>
  //                 </div>
  //               </CardContent>
  //             </Card>
  //           ))}
  //         </ScrollArea>
  //       </aside>

  //       <main className="p-6">
  //         {selectedMsg && (
  //           <div className="bg-white rounded-xl shadow p-6 max-w-4xl">
  //             <h2 className="text-xl font-semibold mb-2 text-gray-800">
  //               {selectedMsg.subject.toUpperCase()}
  //             </h2>
  //             <div className="flex items-center gap-3 mb-4">
  //               <img src={selectedMsg.avatar} className="w-10 h-10 rounded-full object-cover" alt="avatar" />
  //               <div>
  //                 <p className="font-medium">{selectedMsg.name}</p>
  //                 <p className="text-sm text-gray-500">{selectedMsg.email}</p>
  //               </div>
  //               <span className="ml-auto text-xs text-gray-400">Từ {selectedMsg.date}</span>
  //             </div>
  //             <div className="whitespace-pre-line text-gray-700 text-sm leading-relaxed">
  //               {selectedMsg.content}
  //             </div>
  //             <Button className="mt-6 bg-orange-500 hover:bg-orange-600 rounded-xl px-6">Phản hồi</Button>
  //           </div>
  //         )}
  //       </main>
  //     </div>
  //   );
  // }
