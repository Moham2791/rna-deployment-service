package com.example.Manager;
import com.example.User.User;
import com.example.RequestValidator.Environment_Selection_Validation;

public class SequenceHash_Manager extends User {
    private final Environment_Selection_Validation managerMap;

    public SequenceHash_Manager(String name, Environment_Selection_Validation managerMap){
        super(name, "Manager");
        this.managerMap =managerMap;


    }
    @Override
    public  void performAction(){

        managerMap.updateMap("projectX","approved", this);
        managerMap.updateMap("projectX","approved", this);


    }


}
