using System.Text;
using System;
using UnityEngine.Networking;
using UnityEngine;
using System.Collections;


// 유니티에 이 스크립트를 넣은 GameObject만 있으면 테스트가 가능하다

public class WebApiManager : MonoBehaviour
{
    enum Method
    {
        POST,
        GET,
        UPDATE,
        DELETE
    }

    string _baseUrl = "http://localhost:3000/game";
    void Start()
    {
        UserInfoDto res = new UserInfoDto(1, 0, "c", "hyeonu", new DateTime().Date, new DateTime().Date);

        SendPostRequest("", res, (uwr) =>
        {
            Debug.Log("post 호출");
        });

        SendGetAllRequest("userinfo/hyeonu", (uwr) =>
        {
            Debug.Log("get 호출");
        });
    }

    public void SendPostRequest(string url, object obj, Action<UnityWebRequest> callback)
    {
        StartCoroutine(CosendWebRequest(url, Enum.GetName(typeof(Method), Method.POST), obj, callback));
    }
    public void SendGetAllRequest(string url, Action<UnityWebRequest> callback)
    {
        StartCoroutine(CosendWebRequest(url, Enum.GetName(typeof(Method), Method.GET), null, callback));
    }

    IEnumerator CosendWebRequest(string url, string method, object obj, Action<UnityWebRequest> callback)
    {
        string sendUrl = $"{_baseUrl}/{url}";

        byte[] jsonByte = null;

        if (obj != null)
        {
            string jsonStr = JsonUtility.ToJson(obj);
            jsonByte = Encoding.UTF8.GetBytes(jsonStr);
        }
        var uwr = new UnityWebRequest(sendUrl, method);

        uwr.uploadHandler = new UploadHandlerRaw(jsonByte);
        uwr.downloadHandler = new DownloadHandlerBuffer();
        uwr.SetRequestHeader("Content-Type", "application/json");

        yield return uwr.SendWebRequest();

        if (uwr.result != UnityWebRequest.Result.Success)
        {
            Debug.Log(uwr.result);
        }
        else
        {
            Debug.Log(uwr.downloadHandler.text);
            callback.Invoke(uwr);
        }
    }
}

public class UserInfoDto{
    public int level;
    public int exp;
    public string job;
    public string name;
    public DateTime createdDt;
    public DateTime updatedDt;

    public UserInfoDto(int level, int exp, string job, string name, DateTime createdDt, DateTime updatedDt) {
        this.level = level;
        this.exp = exp;
        this.job = job;
        this.name = name;
        this.createdDt = createdDt;
        this.updatedDt = updatedDt;
    }
}