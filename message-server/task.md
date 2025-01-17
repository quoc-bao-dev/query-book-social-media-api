# set up

-   dung Map và Set để lưu các room
    room có cấu trúc:
    {
    roomId:
    member: [string] (đây là user id)
    }

-   viết hàm getUser:
    lấy dữ liệu trong redis, nếu redis chưa có thì gọi để server chính để lấy thông tin

-   lấy thông tin kết nối giữa user và server, khi người dùng truy cập vào trang web thì sẽ tạo ra một id giữa tab người dùng truy cập và server tab này sẽ được lưu vào mản của user, nếu

# flow

-   khi người dùng truy cập ứng dụng -> gọi đến endpoint get all room để lấy tất "room chat":
    thông tin lấy bao gồm list room mỗi room có cấu trúc sau:
    {
    roomChatInfo
    message: {
    senderId
    content
    }[]
    }

    -   khi người dùng click vào roomchat thì show ra thông tin nhóm chat bao gồm 50 message gần nhất, sau đó dùng kỹ thuật lazy load để lấy thêm tin nhắn khi người dùng cuộn đến hết

    -   khi ngươi dùng nhắn tin vào một tin nhắn sẽ gửi tin nhắn đó để cho tât cả member trong room

    -   lắng nghe sư kiện, khi người dùng nhắn tin đến một user + nếu chưa có room giữ 2 người thì sẽ tạo room cho cả 2 và send cho client + nếu có room thì tin nhắn sẽ được lưu vào room đó và thông báo cho user đó
