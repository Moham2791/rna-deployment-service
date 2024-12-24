package com.example.Controller;
import com.example.RequestValidator.Environment_Selection_Validation;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("api/storage")
public class Controller {
    private Environment_Selection_Validation sequence = new Environment_Selection_Validation();

    public Controller(Environment_Selection_Validation sequence){
        this.sequence=sequence;

    }


}



