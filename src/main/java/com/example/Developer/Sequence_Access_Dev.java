package com.example.Developer;

import com.example.RequestValidator.Environment_Selection_Validation;
import com.example.User.User;

public class Sequence_Access_Dev extends User {
    private final Environment_Selection_Validation managerMap;

    public Sequence_Access_Dev(String name, Environment_Selection_Validation managerMap){

        super(name, "Developer");
        this.managerMap = managerMap;
    }
    @Override
    public void performAction(){
        // Developer queries the storage to check if a project is approved
        boolean exists = managerMap.querySequence("projectx", this);
        if(exists){
            System.out.println("Developer can work on projectx.");
        }
        else {
            System.out.println("Developer cannot work on projectx.");
        }
    }


}
