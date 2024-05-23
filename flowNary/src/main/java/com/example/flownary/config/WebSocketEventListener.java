package com.example.flownary.config;

import com.example.flownary.dto.User.GetUserNickEmailDto;
import com.example.flownary.entity.Notice;
import com.example.flownary.service.NoticeService;
import com.example.flownary.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    private static final Set<String> SESSION_IDS = new HashSet<>();
    private static final Map<String, String> USER_SESSIONS = new HashMap<>(); // <sessionId, userId>
    private static final Map<String, String> USER_PAGE = new HashMap<>(); // <userId, page>
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final NoticeService noticeService;
    private final UserService userService;
    private final SimpMessagingTemplate messagingTemplate;

    @EventListener
    public void onConnect(SessionConnectEvent event) {
        String sessionId = event.getMessage().getHeaders().get("simpSessionId").toString();
        SESSION_IDS.add(sessionId);
        log.info("[connect] connections : {}", SESSION_IDS.size());
    }

    @EventListener
    public void onDisconnect(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId();
        SESSION_IDS.remove(sessionId);
        USER_SESSIONS.remove(sessionId);
        USER_PAGE.values().removeIf(page -> USER_SESSIONS.get(sessionId).equals(page));
        log.info("[disconnect] connections : {}", SESSION_IDS.size());
    }

    @EventListener
    public void handleWebSocketMessage(Message<?> message) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        String sessionId = headerAccessor.getSessionId();
        Map<String, Object> payload = (Map<String, Object>) message.getPayload();
        
        String userId = (String) payload.get("userId");
        String page = (String) payload.get("page");
        String action = (String) payload.get("action");

        if ("enter".equals(action)) {
            USER_SESSIONS.put(sessionId, userId);
            USER_PAGE.put(userId, page);
        } else if ("leave".equals(action)) {
            USER_SESSIONS.remove(sessionId);
            USER_PAGE.remove(userId);
        }

        log.info("User {} {} page {}", userId, action, page);
    }

    public boolean isUserOnPage(String userId, String page) {
        return page.equals(USER_PAGE.get(userId));
    }
}
