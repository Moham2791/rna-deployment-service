package com.example.RequestValidator;
import com.example.ISharedSequenceMap;
import com.example.Manager.SequenceHash_Manager;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import com.example.User.User;

public class Environment_Selection_Validation implements ISharedSequenceMap {

    private final ConcurrentMap<String,String> requestSequenceHash = new ConcurrentHashMap<>();


    @Override
    public void updateSequence(String key, String value, User user) {
    if(user instanceof SequenceHash_Manager){
        requestSequenceHash.put(key,value);
        System.out.println("manager added/updated: " + key+" -> "+ value);
    }
    else {
        System.out.println("Permission denied! Only managers can modify the sequence");
    }

    }



    @Override
    public boolean querySequence(String key, User user) {
        if(requestSequenceHash.containsKey(key)){
            System.out.println((user.getRole() +"verfied request:"+key+"does not exist."));
            return true;
        }else{
            System.out.println(user.getRole()+" verfied request: "+ key+ "does not exist");
            return false;
        }

    }

    @Override
    public void removeSequence(String key, User user) {

if(user instanceof SequenceHash_Manager){


    requestSequenceHash.remove(key);
    System.out.println("Manager removed: "+ key);

}
else{
    System.out.println("Permission denied! Only managers can modify the sequence");
}
    }

    @Override
    public void getAllKeys() {
        System.out.println("All keys in storage: "+ requestSequenceHash.keySet());

    }
}
