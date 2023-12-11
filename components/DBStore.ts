import dayjs from "dayjs";

// KeyWords, Properties, statuses, types  and Values 
export enum VisibilityScope { PUBLIC, PRIVATE }
export enum ChatSpaceStatus { UNKNOWN, CREATED, OPEN, CLOSED, ENDED }
export enum MessageStatus { UNKNOWN, TYPING, SENT, DISTR, READ, BLOCKED, ERROR }
export enum UserStatus { REGISTER, ACTIVE, DEACTIVATED, BLOCKED, READ, ERROR }
export enum MediaType { OTHER, IMAGE, PDF, VIDEO, SOUND }

// Interface def Atomic Entities

export interface IMedia {
    id?: number;
    type?: string;
    ownerId: number;
    uri: string;
    meta: Map<string, unknown> 
}

export interface IUser {
    id: number;
    username: string;
    avatar: IMedia
}

export interface IMessage {
    id: number;
    chatId: number;
    text: string;
    user: IUser;
    me: boolean;
    createdAt: Date;
    repliedTo?: IMessage;
    status?: MessageStatus;
    media?: IMedia[];
}


export abstract interface IChat {
    id: number;
    ownerId: number;
    createdAt: Date;
    status: ChatSpaceStatus;
    medias?: IMedia[];
    users?: IUser [];
    messages: IMessage[];
}


export interface IChatRoom extends IChat {
    
    title: string;
    category: string [];
    visibility: VisibilityScope;
    adminIds: number [];    
}

export interface IMessageThread extends IChat {

   from?: IMessage; 
   visibility: VisibilityScope.PRIVATE;
   thread: IChat;         
}

//////////////////////////////////////////////
//////////////////////////////////////////////

type DbTypeId = `${string}^${number}` | `${string}` | `${number}`

type DbId = `_@::${DbTypeId}`
type DbTblId = `${DbId}::${DbTypeId}`
type DbRowId = `${DbTblId}::(${DbTypeId})` 
type DbCellId = `${DbRowId}.(${DbTypeId})`

export interface IDBTableCell {
    id : DbCellId;    
    type: string ; // hint theDbId
    data : unknown; 
}

export interface IDBTableRow {
    id: DbRowId; 
    size: number; 
    createdAt: Date;
    data: IDBTableCell [] ;   
}

export interface IDBTable {
    id: DbTblId;
    type : string; 
    size: number; 
    createdAt: Date;
    data: IDBTableRow [];   
}

/*   
    db 
    const Chattbl = new  DBTable()
    Chattbl.id = db.tables.length   
     Chattbl.data = []
*/
    
export interface IDBStore {
    id: number;
    storedFile: string;
    createdAt: Date;
    tables: Map <DbTblId, IDBTable>  ;
}



export class DBTable  implements IDBTable {
    createdAt: Date;
    data: IDBTableRow[]; 
}

export class DBStore implements IDBStore {

    id: number;
    chatSpace: number;
    storedFile: string;
    createdAt: Date;
    tables: IDBTable[];

    constructor( data: DBStore = null ) {
       
        this.id = data?.id || 0;
        this.chatSpace = data?.chatSpace || 0 ;
        this.storedFile = data?.storedFile || '';
        this.createdAt = data?.createdAt || new Date();
        this.tables = data?.tables || [];
    }

} 


const DbStore = new DBStore();

const chatMsgList =[
    {
      id: 4,
      text: 'http://google.com Hello!!!',
      me: false,
      createdAt: dayjs().add(2, 'day').toDate(),
      user: {
        id: 2,
        username: 'Jane Doe',
        avatar: { uri: 'https://i.pravatar.cc/300' },
      },
    },
    {
      id: 5,
      text: '#hashtag Hello!!!',
      me: false,
      createdAt: dayjs().add(2, 'day').toDate(),
      user: {
        id: 2,
        username: 'Jane Doe',
        avatar: { uri: 'https://i.pravatar.cc/300' },
      },
    },
    {
      id: 5,
      text: '#hashtag Hello!!!',
      me: false,
      createdAt: dayjs().add(2, 'day').toDate(),
      user: {
        id: 2,
        username: 'Jane Doe',
        avatar: { uri: 'https://i.pravatar.cc/300' },
      },
      media: [
        {
          uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          type: 1,
          videoOptions: {
            thumbnail:
              'https://peach.blender.org/wp-content/uploads/bbb-splash.png',
          },
        },
      ],
    },
    {
      id: 6,
      text: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

      The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
      me: false,
      createdAt: dayjs().add(2, 'day').toDate(),
      user: {
        id: 2,
        username: 'Jane Doe',
        avatar: { uri: 'https://i.pravatar.cc/300' },
      },
      repliedTo: {
        id: 1,
        text: 'Hello',
        me: true,
        createdAt: new Date(),
        user: {
          id: 1,
          username: 'John Doe',
          avatar: { uri: 'https://i.pravatar.cc/300' },
        },
      },
    }

export default DbStore;