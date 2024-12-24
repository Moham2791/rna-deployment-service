package com.example;
import com.example.User.User;
import java.util.HashMap;

public interface ISharedSequenceMap {
    void updateSequence(String key, String value, User user);
    boolean querySequence(String key, User user);
    void removeSequence(String key, User user);
    void getAllKeys();
}
