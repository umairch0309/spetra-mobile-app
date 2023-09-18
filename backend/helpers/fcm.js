import fcmNode from "fcm-node";
const serverKey =
  "AAAArgGTqeY:APA91bFoEXyHRq51lU26soQUD_1dmSSbSfBdoe3-V7NidzqNDDhJkfDP4ajDO2-WYi8Fg1e8q7v2H9BC5OlwXRRjhbzdFuttd5uTXp6MlKjxhaMOFWZkbus1xTXY-EpYAImS-FsRCbYm";

const fcm = new fcmNode(serverKey);

export default fcm;
