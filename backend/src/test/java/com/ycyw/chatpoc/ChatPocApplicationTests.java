package com.ycyw.chatpoc;

import com.ycyw.chatpoc.user.repository.UserRepository;
import org.testng.annotations.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class ChatPocApplicationTests {

    @Autowired
    private UserRepository userRepository;

    @Test
    void contextLoads() {
        assertThat(userRepository).isNotNull();
    }
}